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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className={"text-center mt-20"}>
      <h2 className={"lead"}>
        Something went wrong when joining you into the group
      </h2>

      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
