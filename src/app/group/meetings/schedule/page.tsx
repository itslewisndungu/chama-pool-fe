"use client";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { Button, NativeSelect, Textarea, TextInput } from "@mantine/core";
import { MeetingCategory } from "@/types/meetings";
import { getFormattedDate } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";

type FormInputs = {
  title: string;
  agenda: string;
  date: Date;
  meetingCategory: MeetingCategory;
};

export default function ScheduleMeetingPage() {
  const form = useForm<FormInputs>({});

  return (
    <section className={""}>
      <h1 className="my-0">Schedule a meeting</h1>

      <form
        onSubmit={form.onSubmit(values => console.log(values))}
        className={"grid gap-4 max-w-lg"}
      >
        <NativeSelect
          label="Meeting category"
          required
          data={[
            {
              label: "Monthly Meeting",
              value: MeetingCategory.MONTHLY_MEETING,
              selected: true,
            },
            { label: "Welfare Meeting", value: MeetingCategory.WELFARE },
            { label: "Emergency meeting", value: MeetingCategory.EMERGENCY },
          ]}
          {...form.getInputProps("meetingCategory")}
        />
        <DateInput
          description={"When will the meeting take place?"}
          label="Meeting date"
          minDate={new Date(Date.now())}
          {...form.getInputProps("date")}
          withAsterisk
          required
        />
        <TextInput
          description="Add an appropriate title"
          placeholder={"June 2021 Monthly Meeting"}
          label="Meeting title"
          withAsterisk
          {...form.getInputProps("title")}
          required
        />
        <Textarea
          label={"Agenda"}
          description={"Summarize the main point of the meeting"}
          {...form.getInputProps("agenda")}
        />

        <span className={"flex gap-4"}>
          <Button rightIcon={<IconPlus size={"1.5rem"} />} type={"submit"}>
            Schedule
          </Button>
          <Button
            variant={"subtle"}
            color={"red"}
            component={Link}
            href={"/group/meetings"}
          >
            Cancel
          </Button>
        </span>
      </form>
    </section>
  );
}
