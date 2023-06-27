"use client";

import { Button, Modal } from "@mantine/core";
import { IconCalendar, IconCalendarEvent, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

type Props = {};

const MeetingsHeader = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="my-0">Meetings</h1>
      <div>
        <Button
          rightIcon={<IconCalendarEvent />}
          component={Link}
          href={"/group/meetings/schedule"}
        >
          Schedule meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingsHeader;
