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
        console.log("set function in Context");
        this.participantNumber = value;
    }

    showNotification(text: string) {
        GM_notification({
            title: "Meetify",
            text,
        });
    }
}