import Context from "../../context";
import { Session } from "../../message/Session";
import SessionManager from "../../message/SessionManager";
import EventListener from "./EventListener"

export default class MessageListener extends EventListener {

    private readonly followRatio = 0.5;

    private sessionManager?: SessionManager;

    private sentMessage?: string;

    constructor(protected readonly context: Context) {
        super(context);
    }

    onMessageReceive(event: CustomEvent<string>) {
        if (!this.sessionManager) {
            this.sessionManager = new SessionManager(this.context);
            this.sessionManager.listen((session: Session) => {
                if (session.getSameMessageCount() > this.context.getParticipantNumber() * this.followRatio && session.getSameMessage() !== this.sentMessage) {
                    console.log(`send "${session.getSameMessage()}"`);
                    this.context.sendMessage(session.getSameMessage());
                    this.sentMessage = session.getSameMessage();
                }
            });
        }

        this.sessionManager.handle(event.detail);
    }
}