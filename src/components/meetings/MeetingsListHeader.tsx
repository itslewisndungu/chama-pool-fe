"use client";

import { NativeSelect, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { MeetingCategory } from "@/types/meetings";

type Props = {
  search: (searchedValue: string) => void;
};

const MeetingsListHeader = (props: Props) => {
  const [search, setSearch] = useState<string>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    props.search(value);
  };

  return (
    <div className="container flex gap-4 items-center">
      <TextInput
        className="flex-1"
        placeholder="Search meeting"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default MeetingsListHeader;
