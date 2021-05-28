import Context from "../../context";

export default abstract class EventListener {

    constructor(protected readonly context: Context) {}

    onJoinMeeting(event: CustomEvent) {}

    onMessageButtonReady(event: CustomEvent<Node>) {}

    onParticipantChange(event: CustomEvent<number>) {}
}