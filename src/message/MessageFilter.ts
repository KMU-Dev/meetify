import Context from "../context";
import { MessageRecord, RefilterCallback } from "./MessagePool";
import { Session } from "./Session";

export default abstract class MessageFilter {

    constructor(protected readonly context: Context, protected readonly refilter: RefilterCallback) {}

    abstract filter(messageRecord: MessageRecord, currentSession?: Session): Session | boolean | undefined;
}
