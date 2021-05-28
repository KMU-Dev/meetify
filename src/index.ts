import Application from "./Application";
import JoinMeetingEventListener from "./event/listener/JoinMeetingEventListener";
import ParticipantEventListener from "./event/listener/ParticipantEventListener";
import MeetifyEvents from "./event/MeetifyEvents";

const application = new Application();
application.registerEventListener(ParticipantEventListener, MeetifyEvents.participantChange);
application.registerEventListener(JoinMeetingEventListener, MeetifyEvents.joinMeeting, MeetifyEvents.messageButtonReady);
application.start();
