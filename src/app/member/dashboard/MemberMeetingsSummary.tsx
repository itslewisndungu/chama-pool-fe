"use client";

import { MemberMeetingSummary } from "@/types/dashboard";
import { Button, Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import Link from "next/link";

interface Props {
  summary: MemberMeetingSummary;
}

export function MemberMeetingsSummary({ summary }: Props) {
  console.log(summary);

  return (
    <section className={"p-4 flex gap-4 flex-wrap"}>
      <Paper className={"flex-1 space-y-4"} withBorder p={"md"} radius={"md"}>
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Scheduled meetings
        </Text>

        {summary.scheduledMeeting === 0 ? (
          <p className={"font-light text-gray-800 text-lg my-2"}>
            No group meetings scheduled
          </p>
        ) : (
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Meetings scheduled:</span>
            <span className={"font-semibold"}>{summary.scheduledMeeting}</span>
          </p>
        )}
        <Button component={Link} href={`/member/meetings`}>
          View meetings
        </Button>
      </Paper>

      <Paper className={"flex-1 space-y-4"} withBorder p={"md"} radius={"md"}>
        <Text size="xs" color="dimmed" className="uppercase font-bold">
          Meetings Summary
        </Text>
        <div>
          <p className={"m-0 space-x-2"}>
            <span className={" text-sm"}>Total meetings Attended</span>
            <span className={"font-semibold"}>{summary.meetingsAttended}</span>
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
