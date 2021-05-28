export default class Context {

    private static instance: Context;

    private participantNumber: number = 0;

    private constructor() {}

    static getInstance() {
        return this.instance || (this.instance = new this());
    }

    getParticipantNumber() {
        return this.participantNumber;
    }

    setParticipantNumber(value: number) {
        this.participantNumber = value;
    }

    showNotification(text: string, timeout: number = 5000) {
        GM_notification({
            title: "Meetify",
            text,
            timeout,
        });
    }
}