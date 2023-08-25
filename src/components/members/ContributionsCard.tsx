"use client";

import { Button, Paper, Text } from "@mantine/core";
import { getFormattedCurrency } from "@/lib/utils";
import { MemberLoanSummary, MemberMeetingSummary } from "@/types/dashboard";

interface ContributionsCardProps {
  summary: MemberMeetingSummary;
}

export function ContributionsCard({ summary }: ContributionsCardProps) {
  return (
    <Paper className={"space-y-4 flex-1"} withBorder p={"md"} radius={"md"}>
      <Text size="xs" color="dimmed" className="uppercase font-bold">
        Financial summary
      </Text>
      <p className="mt-4">Total contributions:</p>
      <p className="lead">{getFormattedCurrency(summary.totalContributions)}</p>
    </Paper>
  );
}
