import Context from "../context";
import { SessionType, Session } from "./Session";

export default class SessionManager {

    private readonly differentMesssageRatio = 0.1;
    private readonly messageInterval = 3000;

    private readonly sessions: Session[] = [];
    private readonly callbacks: SessionUpdateCallback[] = [];

    constructor(private readonly context: Context) {}

    handle(message: string) {
        let session: Session;
        if (this.sessions.length === 0) {
            session = new Session(SessionType.OTHERS);
            this.sessions.push(session);
        } else session = this.sessions[this.sessions.length - 1];

        let shouldPush = false;
        // if session is other or when brand new session manager
        if (session.type === SessionType.OTHERS) {
            if (session.lastMessage?.trim() === message.trim()) {
                const lastMessage = session.popMessage()!;
                session = new Session(SessionType.SAME);
                session.appendMessage(lastMessage);
                shouldPush = true;
            }
        } else if (session.type === SessionType.SAME) {
            if (Date.now() - session.lastTimestamp! > this.messageInterval) {
                session = new Session(SessionType.OTHERS);
                shouldPush = true;
            } else {
                if (session.getSameMessage().trim() === message.trim()) {
                    session.zeroConsequentDifferentCount();
                } else {
                    // check if this message exceed different message count
                    const quota = this.context.getParticipantNumber() * this.differentMesssageRatio;

                    // create new session when exceed quota
                    if (session.getConsequentDifferentCount() > quota) {
                        session = session.createNewFromLast(session.getConsequentDifferentCount(), SessionType.OTHERS);
                        shouldPush = true;
                    } else session.tickConsequentDifferentCount();
                }
            }
        }

        session.appendMessage(message);

        if (shouldPush) {
            if (this.sessions[this.sessions.length - 1].messageCount === 0) this.sessions.pop();
            this.sessions.push(session);
        }

        // call callback
        for (const callback of this.callbacks) callback(session);
    }

    listen(callback: SessionUpdateCallback) {
        this.callbacks.push(callback);
    }
}

type SessionUpdateCallback = (session: Session) => void;