"use client";

import { Button } from "@mantine/core";
import { useTransition } from "react";
import { IconDownload } from "@tabler/icons-react";

type Props = {
  link: string;
  token: string;
};

const downloadReport = async (link: string, token: string) => {
  const req = new Request(link, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await fetch(req)
    .then(res => res.blob())
    .then(blob => {
      const file = window.URL.createObjectURL(blob);
      window.open(file, "_blank");
    });
};

export default function DownloadReportButton({ link, token }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button
        variant={"light"}
        rightIcon={<IconDownload size={20} />}
        onClick={() => startTransition(async () => downloadReport(link, token))}
        loading={pending}
      >
        Download report
      </Button>
    </>
  );
}
