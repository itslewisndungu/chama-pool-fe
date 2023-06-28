"use client";

import { MeetingContribution } from "@/types/meetings";
import { useForm } from "@mantine/form";
import {
  Button,
  Drawer,
  Group,
  NumberInput,
  rem,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { IconEraser, IconPencil } from "@tabler/icons-react";

type Props = {
  contributions: MeetingContribution[];
  opened: boolean;
  close: () => void;
};

export function ContributionsUpdateModal({
  contributions,
  opened,
  close,
}: Props) {
  const form = useForm({
    initialValues: {
      contributions: contributions,
    },
  });

  const fields = form.values.contributions.map((contribution, idx) => {
    return (
      <tr key={contribution.memberId}>
        <td>{idx + 1}</td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {contribution.memberName}
            </Text>
          </Group>
        </td>
        <td>
          <NumberInput {...form.getInputProps(`contributions.${idx}.amount`)} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Drawer
        position={"bottom"}
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        title={<h3 className={"m-0"}>Edit member attendance</h3>}
        size={"100%"}
      >
        <form onSubmit={form.onSubmit(console.log)} onReset={form.onReset}>
          <ScrollArea>
            <Table miw={800} verticalSpacing="sm">
              <thead>
                <tr>
                  <th style={{ width: rem(60) }}>#</th>
                  <th>Member</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{fields}</tbody>
            </Table>
          </ScrollArea>

          <div className={"flex gap-4 m-4 items-center"}>
            <Button type={"submit"} rightIcon={<IconPencil size={20} />}>
              Record Contribution
            </Button>

            <Button
              type={"reset"}
              color={"red"}
              variant={"light"}
              rightIcon={<IconEraser size={20} />}
            >
              Reset
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  );
}
