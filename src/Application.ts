import Context from "./context/index";
import EventListener from "./event/listener/EventListener";
import MeetifyEvents from "./event/MeetifyEvents";
import MutationHandlerFactory from "./handler/MutationHandlerFactory";

export default class Application {

    private readonly eventHandlerMap: Record<string, keyof EventListener> = {
        "joinMeeting": "onJoinMeeting",
        "messageButtonReady": "onMessageButtonReady",
        "participantChange": "onParticipantChange",
    };

    private context: Context = Context.getInstance();
    private observer: MutationObserver;
    private listenerStore: Map<MeetifyEvents, NewableListener<EventListener>[]> = new Map();

    constructor() {
        this.observer = new MutationObserver(this.mutationCallback);
    }

    start() {
        console.log("Application start.");
        this.monitorEvent();
        this.observer.observe(window.document.body, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true,
        });
    }

    registerEventListener(listener: NewableListener<EventListener>, ...eventTypes: MeetifyEvents[]) {
        for (const type of eventTypes) {
            const registeredListeners = this.listenerStore.has(type) ? this.listenerStore.get(type)! : [];
            registeredListeners.push(listener);
            this.listenerStore.set(type, registeredListeners);
        }
    }

    private mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
        for (const mutation of mutations) {
            const handler = MutationHandlerFactory.create(mutation.type, this.context);
            handler.handle(mutation);
        }
    }

    private monitorEvent() {
        this.listenerStore.forEach((value, key) => {
            /* console.log(key);
            console.log(value); */
            addEventListener(key, (event) => {
                for (const Listener of value) {
                    const listener = new Listener(this.context);
                    listener[this.eventHandlerMap[key]](event as CustomEvent);
                }
            });
        })
    }
}

type NewableListener<T extends EventListener> = {
    new (context: Context): T;
};
