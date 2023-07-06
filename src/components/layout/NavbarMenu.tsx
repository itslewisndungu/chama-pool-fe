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
import { useRouter } from "next/router";
import { MemberRole } from "@/types/MemberRole";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const useStyles = createStyles(theme => ({
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

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
  },
}));

type Props = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export function NavbarMenu({ lastName, firstName, isAdmin }: Props) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();

  const page = usePathname();
  const inAdminPage = page.startsWith("/group");

  return (
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
              {firstName} {lastName}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Account details
        </Menu.Item>

        {isAdmin ? (
          inAdminPage ? (
            <Menu.Item
              component={Link}
              href={"/member/dashboard"}
              icon={<IconSettings size="0.9rem" stroke={1.5} />}
            >
              Switch to members page
            </Menu.Item>
          ) : (
            <Menu.Item
              component={Link}
              href={"/group/dashboard"}
              icon={<IconSettings size="0.9rem" stroke={1.5} />}
            >
              Switch to admin
            </Menu.Item>
          )
        ) : null}

        <Menu.Item
          onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
