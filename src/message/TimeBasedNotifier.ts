import Context from "../context";
import { MessageRecord } from "./MessagePool";
import { Session } from "./Session";
import SessionChangedNotifier from "./SessionChangedNotifier";

export default class TimeBasedNotifier extends SessionChangedNotifier {

    constructor(protected readonly context: Context) {
        super(context);
    }

    shouldNotify(session: Session) {
        return true;
    }

    notify(session: Session, message: MessageRecord[]) {
        console.log("# in TimeBasedNotifier");
        console.log(session);
        console.log(message);
    }
}