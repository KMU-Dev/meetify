import Context from "../context";
import MessageFilter from "./MessageFilter";
import { MessageRecord, RefilterCallback } from "./MessagePool";
import { Session, SesstionType } from "./Session";

export default class SameFilter extends MessageFilter {

    private static readonly differentMessageRatio = 1 / 20;

    private sameMessage?: string;
    private differentMessageCount = 0;

    private shouldCreateSession = false;

    constructor(protected readonly context: Context, protected readonly refilter: RefilterCallback) {
        super(context, refilter);
    }

    filter(messageRecord: MessageRecord, currentSession?: Session) {
        if (this.shouldCreateSession) {
            const session = Session.create(SesstionType.SAME);
            session.messages.push(messageRecord);

            this.shouldCreateSession = false;
            this.sameMessage = messageRecord.message;

            return session;
        }

        if (!currentSession) return;

        const sessionMessages = currentSession.messages;
        const lastMessageRecord = sessionMessages.length === 0 ? undefined : sessionMessages[sessionMessages.length - 1];

        if (messageRecord.message === lastMessageRecord?.message) {
            this.differentMessageCount = 0;

            if (currentSession.type === SesstionType.SAME) return true;
            else {
                // refilter the last message and filter it to SAME session
                this.shouldCreateSession = true;
                this.refilter(1);
                return true;
            };
        } else {
            if (currentSession.type === SesstionType.SAME) {
                if (messageRecord.message === this.sameMessage) return true;
                else {
                    // check if different message exceeds threshold
                    const participantCount = this.context.getParticipantNumber();

                    this.differentMessageCount += 1;
                    
                    // filter the message to OTHER session type
                    if (this.differentMessageCount <= participantCount * SameFilter.differentMessageRatio + 1) return true;
                }
            }
        }
    }
}
