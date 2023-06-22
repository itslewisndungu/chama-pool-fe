"use client";

import { Button } from "@mantine/core";
import { IconCalendar, IconCalendarEvent, IconPlus } from "@tabler/icons-react";

type Props = {};

const MeetingsHeader = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="my-0">Meetings</h1>
      <div>
        <Button rightIcon={<IconCalendarEvent />}>Schedule meeting</Button>
      </div>
    </div>
  );
};

export default MeetingsHeader;
