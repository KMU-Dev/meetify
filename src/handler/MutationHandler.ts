import Context from "../context/index";
import MeetifyEvents from "../event/MeetifyEvents";

export default abstract class MutationHandler {

    constructor(protected context: Context) {}

    abstract handle(mutaion: MutationRecord): void;

    protected fireEvent<T>(eventType: MeetifyEvents, eventInitDict?: T) {
        const event = new CustomEvent(eventType, { detail: eventInitDict });
        dispatchEvent(event);
    }
}