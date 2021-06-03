import Context from "../context";
import { MessageRecord } from "./MessagePool";
import { Session, SesstionType } from "./Session";
import TimeBasedNotifier from "./TimeBasedNotifier";

export default class SameMessageNotifier extends TimeBasedNotifier {

    private static readonly sendMessageRatio = 0.3;

    private sendSessionId?: number;

    constructor(protected readonly context: Context) {
        super(context);
    }

    shouldNotify(session: Session) {
        const timeBasedResult = super.passMpmThreshold(session.messages);

        if (session.type === SesstionType.SAME) {
            const participantNumber = this.context.getParticipantNumber();
            console.log("session.messages.length: " + session.messages.length);
            console.log("participantNumber * SameMessageNotifier.sendMessageRatio: " + participantNumber * SameMessageNotifier.sendMessageRatio);
            if (session.messages.length > participantNumber * SameMessageNotifier.sendMessageRatio) {
                return timeBasedResult && session.id !== this.sendSessionId;
            }
        }

        return false;
    }

    notify(session: Session, _messages: MessageRecord[]) {
        const sameMessage = session.messages[0].message;

        // send message
        console.log(`send "${sameMessage}"`);
        this.context.sendMessage(sameMessage);

        this.sendSessionId = session.id;
    }
}