import $ from "jquery";
import Context from "../context";
import MeetifyEvents from "../event/MeetifyEvents";
import MutationHandler from "./MutationHandler";

export default class CharacterDataMutationHandler extends MutationHandler {
    constructor(protected context: Context) {
        super(context);
    }

    handle(mutation: MutationRecord) {
        const targetParent = mutation.target.parentNode!;
        if ($(targetParent).hasClass("uGOf1d")) {
            const participantNumber = +mutation.target.nodeValue!;
            this.fireEvent(MeetifyEvents.participantChange, participantNumber);
        }
    }
}