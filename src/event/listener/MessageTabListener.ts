import Context from "../../context";
import EventListener from "./EventListener";

export default class MessageTabListener extends EventListener {
    constructor(protected readonly context: Context) {
        super(context);
    }

    onMessageTabVisibilityChange(event: CustomEvent<boolean>) {
        // if (!event.detail) this.context.showNotification("Please open the message tab. Otherwise, Meetify cannot work properly.");
    }
}