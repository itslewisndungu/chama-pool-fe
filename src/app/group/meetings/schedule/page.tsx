"use client";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { Button, NativeSelect, Textarea, TextInput } from "@mantine/core";
import { Meeting, MeetingCategory } from "@/types/meetings";
import { getFormattedDate } from "@/lib/utils";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

type FormInputs = {
  title: string;
  agenda: string;
  date: Date;
  category: string;
};

const scheduleMeeting = async (meeting: FormInputs, token: string) => {
  const req = new Request("http://localhost:8080/meetings/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(meeting),
  });

  return (await fetch(req).then(res => res.json())) as Meeting;
};

export default function ScheduleMeetingPage() {
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  const form = useForm<FormInputs>();

  const handleSubmit = async (values: FormInputs) => {
    startTransition(async () => {
      try {
        const meeting = await scheduleMeeting(values, session!.accessToken);
        notifications.show({
          title: `Meeting successfully scheduled for ${getFormattedDate(
            new Date(meeting.date)
          )}`,
          message: "Members will be notified of the meeting.",
          autoClose: 10000,
          icon: <IconCheck />,
        });
        await router.push(`/group/meetings/${meeting.id}/attendance`);
      } catch (e) {
        setError("An error occurred while scheduling the meeting. Retry?");
      }
    });
  };

  return (
    <section className={""}>
      <h1 className="my-0">Schedule a meeting</h1>

      <form
        onSubmit={form.onSubmit(v => handleSubmit(v))}
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
          {...form.getInputProps("category")}
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
          required
          {...form.getInputProps("title")}
        />
        <Textarea
          label={"Agenda"}
          description={"Summarize the main point of the meeting"}
          {...form.getInputProps("agenda")}
        />

        <div className={"min-h-[1.25rem] my-2"}>
          {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}
        </div>

        <span className={"flex gap-4"}>
          <Button
            rightIcon={<IconPlus size={"1.5rem"} />}
            type={"submit"}
            loading={loading}
          >
            Schedule
          </Button>
          <Button
            variant={"subtle"}
            color={"red"}
            component={Link}
            href={"/group/meetings"}
            disabled={loading}
          >
            Cancel
          </Button>
        </span>
      </form>
    </section>
  );
}
