"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@mantine/core";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong when getting your meetings</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
