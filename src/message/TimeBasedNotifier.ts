import Context from "../context";
import { MessageRecord } from "./MessagePool";
import { Session, SesstionType } from "./Session";
import SessionChangedNotifier from "./SessionChangedNotifier";

export default class TimeBasedNotifier extends SessionChangedNotifier {

    private static readonly mpmThreshold = 4;

    private notifiedSessionId?: number;

    constructor(protected readonly context: Context) {
        super(context);
    }

    shouldNotify(session: Session) {
        if (session.id !== this.notifiedSessionId) {
            const messages = session.messages;

            return this.passMpmThreshold(messages);
        }
        return false;
    }

    notify(session: Session, _messages: MessageRecord[]) {
        if (session.type === SesstionType.SAME) {
            const sameMessage = session.messages[0].message;
            this.context.showNotification(`Many users are sending "${sameMessage}" in a short time`);
        } else if (session.type === SesstionType.OTHERS) {
            this.context.showNotification(`Many users are sending messages in a short time`);
        }

        this.notifiedSessionId = session.id;
    }

    protected passMpmThreshold(messages: MessageRecord[]) {
        // length should be more than threshold for the triggering of notify function
        if (messages.length >= TimeBasedNotifier.mpmThreshold) {
            const firstMessageTime = messages[messages.length - TimeBasedNotifier.mpmThreshold].timestamp;
            const lastMessageTime = messages[messages.length - 1].timestamp;

            // notify if time duration is less than 1 min
            if (lastMessageTime - firstMessageTime < 60 * 1000) return true;
        }

        return false;
    }
}