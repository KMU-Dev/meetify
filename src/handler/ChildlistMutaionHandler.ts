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

                // monitor message in new user
                if ($(addedNode).attr("jsname") === "Ypafjf" && $(addedNode).children().length > 0) {
                    const message = $(addedNode).find("[jsname='dTKtvb']:not(.gYckH)").text();
                    if (message !== "") this.fireEvent(MeetifyEvents.receiveMessage, message);
                }

                // monitor message in same user
                if ($(addedNode).attr("jsname") === "dTKtvb" && !$(addedNode).hasClass("gYckH")) {
                    this.fireEvent(MeetifyEvents.receiveMessage, $(addedNode).text());
                }
            })
        }
    }
}