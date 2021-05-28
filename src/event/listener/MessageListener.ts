import Context from "../../context";
import EventListener from "./EventListener"

export default class MessageListener extends EventListener {

    constructor(protected readonly context: Context) {
        super(context);
    }

    onMessageReceive(event: CustomEvent<string>) {
        console.log(event.detail);
    }
}