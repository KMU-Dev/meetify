import Application from "./Application";
import JoinMeetingEventListener from "./event/listener/JoinMeetingEventListener";
import MeetifyEvents from "./event/MeetifyEvents";

const application = new Application();
addEventListener(MeetifyEvents.participantChange, (event) => {
    console.log("event triggered");
})
application.registerEventListener(JoinMeetingEventListener, MeetifyEvents.joinMeeting, MeetifyEvents.messageButtonReady, MeetifyEvents.participantChange);
application.start();
