"use client";

import { Button, Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import { MeetingsSummary } from "@/types/dashboard";

type Props = {
  summary: MeetingsSummary;
};

export function ScheduledMeetings({ summary }: Props) {
  return (
    <section className={"p-4 flex gap-4 flex-wrap"}>
      <Paper className={"flex-1 space-y-4"} withBorder p={"md"} radius={"md"}>
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Scheduled meetings
        </Text>

        {summary.scheduledMeetings === 0 ? (
          <>
            <p className={"font-light text-gray-800 text-lg my-2"}>
              No group meetings scheduled
            </p>
            <Button>Schedule meeting</Button>
          </>
        ) : (
          <>
            <p className={"m-0 space-x-2"}>
              <span className={" text-sm"}>Meetings scheduled:</span>
              <span className={"font-semibold"}>
                {summary.scheduledMeetings}
              </span>
            </p>
            <Button>View meetings</Button>
          </>
        )}
      </Paper>

      <Paper className={"flex-1 space-y-4"} withBorder p={"md"} radius={"md"}>
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Meetings Summary
        </Text>
        <div>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Total meetings held:</span>
            <span className={"font-semibold"}>{summary.meetings}</span>
          </p>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Total amount contributed:</span>
            <span className={"font-semibold"}>
              {getFormattedCurrency(summary.totalContributions)}
            </span>
          </p>
        </div>
      </Paper>
    </section>
  );
}
