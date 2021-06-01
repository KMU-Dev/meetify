import Context from "../context";
import { MessageRecord } from "./MessagePool";
import { Session, SesstionType } from "./Session";
import TimeBasedNotifier from "./TimeBasedNotifier";

export default class SameMessageNotifier extends TimeBasedNotifier {

    private static readonly sendMessageRatio = 0.3;

    constructor(protected readonly context: Context) {
        super(context);
    }

    shouldNotify(session: Session) {
        const timeBasedResult = super.shouldNotify(session);

        if (session.type === SesstionType.SAME) {
            const participantNumber = this.context.getParticipantNumber();
            if (session.messages.length > participantNumber * SameMessageNotifier.sendMessageRatio) return timeBasedResult;
        }

        return false;
    }

    notify(session: Session, _messages: MessageRecord[]) {
        const sameMessage = session.messages[0].message;

        // send message
        console.log(`send "${sameMessage}"`);
        this.context.sendMessage(sameMessage);
    }
}