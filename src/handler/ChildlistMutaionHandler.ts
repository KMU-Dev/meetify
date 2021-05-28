import $ from "jquery";
import Context from "../context";
import MeetifyEvents from "../event/MeetifyEvents";
import MutationHandler from "./MutationHandler";

export default class ChildlistMutaionHandler extends MutationHandler {

    private count: number = 0;

    constructor(protected context: Context) {
        super(context);
    }
    

    handle(mutation: MutationRecord) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(addedNode => {
                if ($(addedNode).attr("jsname") === "EaZ7Cc") this.fireEvent(MeetifyEvents.joinMeeting);
                if ($(addedNode).attr("jsname") === "A5il2e" && $(addedNode).attr("data-panel-id") === "2") {
                    this.fireEvent(MeetifyEvents.messageButtonReady, addedNode);
                }
            })
        }
    }
}