import Context from "../context";
import MessageFilter from "./MessageFilter";
import MessageHandler from "./MessageHandler";
import { Session, SesstionType } from "./Session";
import SessionChangedNotifier from "./SessionChangedNotifier";

export class MessagePool {

    private readonly messages: MessageRecord[] = [];
    private readonly sessions: Session[] = [];

    private readonly filters: MessageFilterDef[] = [];
    private readonly notifiers: SessionChangedNotifier[] = [];

    constructor(private readonly context: Context) {}

    registerFilter(Filter: FilterType<MessageFilter>, priority: number) {       
        const filter = new Filter(this.context, this.refilter);
        const filterDef = { filter, priority };

        let isInserted = false;
        for (let i = this.filters.length - 1; i >= 0; i--) {
            if (priority > this.filters[i].priority) {
                this.filters.splice(i, 0, filterDef);
                isInserted = true;
            }
        }

        if (!isInserted) this.filters.push(filterDef);
    }

    registerNotifiers(Notifier: NotifierType<SessionChangedNotifier>) {
        const notifier = new Notifier(this.context);
        this.notifiers.push(notifier);
    }

    pour(message: string) {
        const record: MessageRecord = {
            message,
            timestamp: Date.now(),
        };

        this.messages.push(record);

        // call filters
        this.callFilters(record);

        // call notifier
        for (const notifier of this.notifiers) {
            const currentSession = this.sessions[this.sessions.length - 1];
            if (notifier.shouldNotify(currentSession)) notifier.notify(currentSession, this.messages);
        }
    }

    private callFilters(record: MessageRecord) {
        const currentSession = this.sessions.length === 0 ? undefined : this.sessions[this.sessions.length -1];

        for (const filterDef of this.filters) {
            const filter = filterDef.filter;
            const result = filter.filter(record, currentSession);

            if (result instanceof Session) {
                this.sessions.push(result);
                break;
            } else if (result) {
                const newCurrentSession = this.sessions.length === 0 ? undefined : this.sessions[this.sessions.length -1];
                if (newCurrentSession) newCurrentSession.messages.push(record);
                else throw new Error("You cannot add message to undefined session");
                break;
            }
        }
    }

    private readonly refilter = (count: number) => {
        // remove corresponded count of message from session
        let removingCount = count;
        while (removingCount > 0) {
            const lastSession = this.sessions[this.sessions.length - 1];

            if (lastSession.messages.length <= removingCount) {
                // remove the whole session
                removingCount -= lastSession.messages.length;
                this.sessions.pop();
            } else {
                lastSession.messages.splice(lastSession.messages.length - removingCount, removingCount);
                removingCount = 0;
            }
        }

        // refilter the correspond count of message
        const messageRecords = this.messages.slice(this.messages.length - count - 1, this.messages.length - 1);
        for (const record of messageRecords) this.callFilters(record);
    }
}

export interface MessageRecord {
    message: string
    timestamp: number
}

interface MessageFilterDef {
    filter: MessageFilter
    priority: number
}

export type RefilterCallback = (count: number) => void;

type FilterType<T extends MessageFilter> = {
    new (context: Context, refilter: RefilterCallback): T
}

type HandlerType<T extends MessageHandler> = {
    new (context: Context): T
}

type NotifierType<T extends SessionChangedNotifier> = {
    new (context: Context): T
}
