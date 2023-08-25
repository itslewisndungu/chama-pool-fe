"use client";

import { UserProfile } from "@/types/user";
import { createStyles, Avatar, Text, Group, Paper } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";

const useStyles = createStyles(theme => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

type Props = {
  profile: UserProfile;
};

export function AvatarCard({ profile }: Props) {
  const { classes } = useStyles();
  const role = profile.roles.pop();

  return (
      <Paper
        className={"m-4  min-w-[300px]"}
        withBorder
        p={"md"}
        radius={"md"}
      >
        <div className="flex gap-4 flex-col items-center">
          <Avatar color="cyan" radius="xl" size="xl">
            {profile.firstName.split("")[0]}
            {profile.lastName.split("")[0]}
          </Avatar>

          <div className="flex flex-col items-center">
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {role}
            </Text>

            <Text fz="xl" fw={500} className={classes.name}>
              {`${profile.firstName} ${profile.lastName}`}
            </Text>


            <Group noWrap spacing={10} mt={3}>
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              <Text fz="sm" c="dimmed">
                {profile.username}
              </Text>
            </Group>

            <Group noWrap spacing={10} mt={5}>
              <IconPhoneCall
                stroke={1.5}
                size="1rem"
                className={classes.icon}
              />
              <Text fz="sm" c="dimmed">
                {profile.phoneNumber}
              </Text>
            </Group>
          </div>
        </div>
      </Paper>
  );
}
