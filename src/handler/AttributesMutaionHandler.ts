import $ from "jquery";
import Context from "../context";
import MeetifyEvents from "../event/MeetifyEvents";
import MutationHandler from "./MutationHandler";

export default class AttributesMutaionHandler extends MutationHandler {

    private messageTabVisible?: boolean;
    private messageTabChangeTime?: number;

    constructor(protected context: Context) {
        super(context);
    }

    handle(mutaion: MutationRecord) {
        const target = mutaion.target;
        if ($(target).attr("jsname") === "b0t70b" && $(target).attr("data-tab-id") === "2") {
            const visible = $(target).is(":visible");
            if (this.messageTabVisible !== visible && (!this.messageTabChangeTime || Math.abs(new Date().getTime() - this.messageTabChangeTime) > 200)) {
                this.fireEvent(MeetifyEvents.messageTabVisibilityChange, visible);
            }
            this.messageTabVisible = visible;
            this.messageTabChangeTime = new Date().getTime();
        }
    }
}