import Context from "../context";
import MessageFilter from "./MessageFilter"
import { MessageRecord, RefilterCallback } from "./MessagePool";
import { Session, SesstionType } from "./Session";

export default class OtherFilter extends MessageFilter {

    private readonly messageQueue: MessageRecord[] = [];

    constructor(protected readonly context: Context, protected readonly refilter: RefilterCallback) {
        super(context, refilter);
    }

    filter(messageRecord: MessageRecord, currentSession?: Session) {
        if (currentSession) {
            if (currentSession.type !== SesstionType.OTHERS) return this.createOtherSession(messageRecord);
            return true;
        } else return this.createOtherSession(messageRecord);
    }

    private createOtherSession(record: MessageRecord) {
        const session = Session.create(SesstionType.OTHERS);
        session.messages.push(record);
        return session;
    }
}
