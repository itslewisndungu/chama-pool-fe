"use client";

import { Button, Modal } from "@mantine/core";
import { IconCalendar, IconCalendarEvent, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import DownloadReportButton from "@/components/reports/DownloadReportButton";
import { getEndpointPath } from "@/lib/utils";

type Props = { token: string };

const MeetingsHeader = ({ token }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="my-0">Meetings</h1>
      <div className={"space-x-4"}>
        <Button
          rightIcon={<IconCalendarEvent />}
          component={Link}
          href={"/group/meetings/schedule"}
        >
          Schedule meeting
        </Button>
        <DownloadReportButton
          link={getEndpointPath(`/meetings/report`)}
          token={token}
        />
      </div>
    </div>
  );
};

export default MeetingsHeader;
