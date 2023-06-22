"use client";

import { useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconLogin,
  IconSettings,
  IconChevronDown,
  IconUserCircle,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

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

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
  },
}));

interface Props {}

export default function Navbar({}: Props) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { data: session } = useSession();

  return (
    <header className={classes.header}>
      <div className={`text-white py-2 px-8`}>
        <Group position="apart">
          <p>Vision Ahead Chama System</p>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <IconUserCircle />
                  <Text
                    weight={500}
                    size="sm"
                    sx={{ lineHeight: 1, color: theme.white }}
                    mr={3}
                  >
                    {session
                      ? `${session.user.firstName} ${session.user.lastName}`
                      : "Account"}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            {session ? (
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                  Account details
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    signOut({ redirect: false, callbackUrl: "/login" })
                  }
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            ) : (
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => signIn()}
                  icon={<IconLogin size="0.9rem" stroke={1.5} />}
                >
                  Log in
                </Menu.Item>
              </Menu.Dropdown>
            )}
          </Menu>
        </Group>
      </div>
    </header>
  );
}
