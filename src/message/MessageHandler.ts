import Context from "../context";
import { MessageRecord } from "./MessagePool";

export default abstract class MessageHandler {

    constructor(protected readonly context: Context) {}

    abstract handle(messages: MessageRecord[]): void
}
