import Context from "../../context";
import EventListener from "./EventListener";

export default class ParticipantEventListener extends EventListener {
    constructor(protected readonly context: Context) {
        super(context);
    }

    onParticipantChange(event: CustomEvent<number>) {
        this.context.setParticipantNumber(event.detail);
    }
}