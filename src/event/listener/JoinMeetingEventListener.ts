import $ from "jquery";
import Context from "../../context";
import EventListener from "./EventListener";

export default class JoinMeetingEventListener extends EventListener {

    constructor(protected readonly context: Context) {
        super(context);
    }

    onJoinMeeting(_event: Event) {
        console.log("Meetify is notified by the joint of meeting")
    }

    onMessageButtonReady(event: any) {
        $(event.detail).trigger("click");
        this.context.showNotification("Meetify starts monitoring incoming message");
    }
}