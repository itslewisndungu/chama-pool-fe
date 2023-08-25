"use client";

import {
  createStyles,
  Group,
  Burger,
  rem,
  Button,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { NavbarMenu } from "@/components/layout/NavbarMenu";
import { MemberRole } from "@/types/user";
import { usePathname } from "next/navigation";

const useStyles = createStyles(theme => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: `${rem(1)} solid ${
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background
    }`,
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
}));

interface Props {
  notificationsIcon: React.ReactNode;
}

export default function Navbar({ notificationsIcon }: Props) {
  const { classes, theme } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const { data: session, status } = useSession();

  const isAdmin =
    status === "authenticated" &&
    session.user.roles.some(
      role =>
        role === MemberRole.SECRETARY ||
        role === MemberRole.TREASURER ||
        role === MemberRole.CHAIRMAN
    );

  const inAdminDashboard = usePathname().startsWith("/group");

  return (
    <header className={classes.header}>
      <div className={`text-white py-2 px-8`}>
        <Group position="apart">
          <p className={"font-semibold my-0"}>
            Vision Ahead Chama System <br />
            {inAdminDashboard ? "Admin dasboard" : null}
          </p>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <div className={"flex gap-4 items-center"}>
            {status === "authenticated" ? (
              <>
                <div>{notificationsIcon}</div>

                <NavbarMenu
                  firstName={session.user.firstName}
                  lastName={session.user.lastName}
                  isAdmin={isAdmin}
                />
              </>
            ) : status === "unauthenticated" ? (
              <Button
                onClick={() => signIn()}
                rightIcon={<IconLogin size={22} />}
              >
                Login
              </Button>
            ) : (
              <Loader color={"cyan"} size={"sm"} />
            )}
          </div>
        </Group>
      </div>
    </header>
  );
}
