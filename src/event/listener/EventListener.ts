import Context from "../../context";

export default abstract class EventListener {

    constructor(protected readonly context: Context) {}

    onJoinMeeting(event: Event) {}

    onMessageButtonReady(event: Event) {}

    onParticipantChange(event: Event) {}
}