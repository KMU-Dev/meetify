import Application from "./Application";
import JoinMeetingListener from "./event/listener/JoinMeetingListener";
import MessageTabListener from "./event/listener/MessageTabListener";
import ParticipantListener from "./event/listener/ParticipantListener";
import MeetifyEvents from "./event/MeetifyEvents";

const application = new Application();

application.registerEventListener(ParticipantListener, MeetifyEvents.participantChange);

application.registerEventListener(JoinMeetingListener, MeetifyEvents.joinMeeting, MeetifyEvents.messageButtonReady);
application.registerEventListener(MessageTabListener, MeetifyEvents.messageTabVisibilityChange);

application.start();
