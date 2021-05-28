export class Session {
    private messages: string[] = [];
    private timestamps: number[] = [];

    private sameMessage: string = "";
    private consequentDifferentCount = 0;
    private sameCount = 0;

    constructor(public readonly type: SessionType) {}

    get messageCount() {
        return this.messages.length;
    }

    get lastMessage() {
        return this.messages.length > 0 ? this.messages[this.messages.length - 1] : undefined;
    }

    get lastTimestamp() {
        return this.timestamps.length > 0 ? this.timestamps[this.timestamps.length - 1] : undefined;
    }

    appendMessage(message: string) {
        if (this.type === SessionType.SAME) {
            if (this.messages.length === 0) this.sameMessage = message;

            if (message === this.sameMessage) {
                this.sameCount++;
                this.consequentDifferentCount = 0;
            } else this.consequentDifferentCount++;
        }

        this.messages.push(message);
        this.timestamps.push(Date.now());
    }

    popMessage() {
        this.timestamps.pop();
        return this.messages.pop();
    }

    getSameMessage() {
        return this.sameMessage;
    }

    getSameMessageCount() {
        return this.sameCount;
    }

    getConsequentDifferentCount() {
        return this.consequentDifferentCount;
    }

    createNewFromLast(count: number, type: SessionType) {
        const session = new Session(type);
        session.messages = this.messages.splice(this.messages.length - count, count);
        session.timestamps = this.timestamps.splice(this.timestamps.length - count, count);
        return session;
    }
}

export enum SessionType {
    SAME = "SAME",
    STUDENT_ID = "STUDENT_ID",
    OTHERS = "OTHERS",
}