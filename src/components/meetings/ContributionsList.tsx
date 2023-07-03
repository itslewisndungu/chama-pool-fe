"use client";

import { MeetingContribution } from "@/types/meetings";
import { Button, Group, rem, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getFormattedCurrency } from "@/lib/utils";
import Props from "@/app/group/meetings/[meetingId]/contributions/page";
import { ContributionsUpdateModal } from "@/components/meetings/ContributionsUpdateModal";

type Props = {
  contributions: MeetingContribution[];
  meetingId: number;
  isAdmin: boolean;
};

export default function ContributionsList({
  contributions,
  meetingId,
  isAdmin,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(100) }}>#</th>
            <th>Member</th>
            <th>Amount Contributed</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution, idx) => {
            return (
              <tr key={contribution.memberId}>
                <td className={"text-gray-800"}>{idx + 1}</td>
                <td>
                  <Group spacing="sm">
                    <Text size="sm" weight={500}>
                      {contribution.memberName}
                    </Text>
                  </Group>
                </td>
                <td>{getFormattedCurrency(contribution.amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {isAdmin ? (
        <>
          <Button onClick={open} className={"mt-4"}>
            Update contributions
          </Button>
          <ContributionsUpdateModal
            meetingId={meetingId}
            contributions={contributions}
            opened={opened}
            close={close}
          />
        </>
      ) : null}
    </>
  );
}
