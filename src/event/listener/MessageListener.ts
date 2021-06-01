import Context from "../../context";
import { MessagePool } from "../../message/MessagePool";
import OtherFilter from "../../message/OtherFilter";
import SameFilter from "../../message/SameFilter";
import SameMessageNotifier from "../../message/SameMessageNotifier";
import TimeBasedNotifier from "../../message/TimeBasedNotifier";
import EventListener from "./EventListener"

export default class MessageListener extends EventListener {

    private readonly followRatio = 0.5;

    private messagePool?: MessagePool;

    constructor(protected readonly context: Context) {
        super(context);
    }

    onMessageReceive(event: CustomEvent<string>) {
        if (!this.messagePool) {
            this.messagePool = new MessagePool(this.context);

            // register message filter
            this.messagePool.registerFilter(SameFilter, 1);
            this.messagePool.registerFilter(OtherFilter, 0);

            // add message Notifier
            this.messagePool.registerNotifiers(TimeBasedNotifier);
            this.messagePool.registerNotifiers(SameMessageNotifier);
        }

        this.messagePool.pour(event.detail);
    }
}