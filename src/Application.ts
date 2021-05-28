import Context from "./context/index";
import EventListener from "./event/listener/EventListener";
import MeetifyEvents from "./event/MeetifyEvents";
import MutationHandlerFactory from "./handler/MutationHandlerFactory";

export default class Application {

    private readonly eventHandlerMap: Record<string, keyof EventListener> = {
        "joinMeeting": "onJoinMeeting",
        "messageButtonReady": "onMessageButtonReady",
        "participantChange": "onParticipantChange",
        "messageTabVisibilityChange": "onMessageTabVisibilityChange",
        "receiveMessage": "onMessageReceive",
    };

    private context: Context = Context.getInstance();
    private observer: MutationObserver;
    private listenerStore: Map<NewableListener<EventListener>, MeetifyEvents[]> = new Map();

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
        this.listenerStore.set(listener, eventTypes);
    }

    private mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
        for (const mutation of mutations) {
            const handler = MutationHandlerFactory.create(mutation.type, this.context);
            handler.handle(mutation);
        }
    }

    private monitorEvent() {
        this.listenerStore.forEach((eventTypes, Listener) => {
            const listener = new Listener(this.context);
            for (const eventType of eventTypes) {
                addEventListener(eventType, (event) => {
                    listener[this.eventHandlerMap[eventType]](event as any);
                });
            }
        })
    }
}

type NewableListener<T extends EventListener> = {
    new (context: Context): T;
};
