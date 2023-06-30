"use client";
import initiateMeeting from "@/lib/initiate-meeting";
import { InitiateMeetingButton } from "@/components/meetings/InitiateMeetingButton";

type Params = {
  meetingId: number;
  isChairman: boolean;
};

export function MeetingNotInitiated({ meetingId, isChairman }: Params) {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      {isChairman ? (
        <>
          <p className={"lead"}>This meeting has not yet been initiated.</p>

          <InitiateMeetingButton
            initiate={initiateMeeting}
            meetingId={meetingId}
          />
        </>
      ) : (
        <p className={"lead"}>
          The chairman has not yet initiated this meeting. Please check back
          later.
        </p>
      )}
    </div>
  );
}
