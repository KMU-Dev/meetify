import Context from "../../context";

export default abstract class EventListener {

    constructor(protected readonly context: Context) {}

    onJoinMeeting(event: CustomEvent<any>) {}

    onMessageButtonReady(event: CustomEvent<Node>) {}

    onParticipantChange(event: CustomEvent<number>) {}

    onMessageTabVisibilityChange(event: CustomEvent<boolean>) {}

    onMessageReceive(event: CustomEvent<string>) {
        
    }
}