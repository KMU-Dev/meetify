import { MessageRecord } from "./MessagePool";

export class Session {

    private static lastId: number = 0;

    readonly messages: MessageRecord[] = [];

    private constructor(readonly id: number, readonly type: SesstionType) {}

    static create(type: SesstionType) {
        return new this(++this.lastId, type);
    }
}

export enum SesstionType {
    SAME = "SAME",
    TEMPLATE  = "TEMPLATE",
    OTHERS = "OTHERS",
}
