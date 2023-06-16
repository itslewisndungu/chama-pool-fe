"use client";

import { useState } from "react";
import { Button, Checkbox } from "@mantine/core";

export function AcceptLoanConditions() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className={"flex gap-8 items-center"}>
      <Checkbox
        label={"I agree to terms and conditions"}
        checked={accepted}
        onChange={event => setAccepted(event.currentTarget.checked)}
      />

      <Button disabled={!accepted}>Apply for loan</Button>
    </div>
  );
}
