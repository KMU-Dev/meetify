import Context from "../../context";
import EventListener from "./EventListener";

export default class MessageTabListener extends EventListener {
    constructor(protected readonly context: Context) {
        super(context);
    }

    onMessageTabVisibilityChange(event: CustomEvent<boolean>) {
        console.log(event.detail);
    }
}