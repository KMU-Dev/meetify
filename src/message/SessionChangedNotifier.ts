import Context from "../context";
import { MessageRecord } from "./MessagePool";
import { Session } from "./Session";

export default abstract class SessionChangedNotifier {

    constructor(protected readonly context: Context) {}

    abstract shouldNotify(session: Session): boolean
    
    abstract notify(session: Session, messages: MessageRecord[]): void
}
