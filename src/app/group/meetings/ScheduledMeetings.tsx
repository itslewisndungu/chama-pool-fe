"use client";
import { Meeting } from "@/types/meetings";

type Props = {
  meetings: Meeting[];
};

const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
  return <p>You have scheduled meetings</p>;
};

export function ScheduledMeetings({ meetings }: Props) {
  return (
    <>
      <h2>Scheduled meetings</h2>

      {meetings.length === 0 ? (
        <p>You have no scheduled meetings</p>
      ) : (
        meetings.map(meeting => <MeetingCard meeting={meeting} />)
      )}
    </>
  );
}
