"use client";

import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from "@mantine/core";
import image from "./../../public/images/chama.jpg";
import { signIn, useSession } from "next-auth/react";
import { isUserAdmin } from "@/lib/utils";
import Link from "next/link";

const useStyles = createStyles(theme => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  const { data: session } = useSession();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to
              <span className={classes.highlight}>Vision Ahead Group</span>{" "}
              Digital Management System
            </Title>

            <Text color="dimmed" mt="md">
              Vision ahead is a savings and investment group that harnesses the
              power of Table banking to empower its members.
            </Text>

            <Group mt={30}>
              {!session ? (
                <Button
                  size="md"
                  className={classes.control}
                  onClick={() => signIn()}
                >
                  Login
                </Button>
              ) : (
                <Button
                  size="md"
                  className={classes.control}
                  component={Link}
                  href="/member/dashboard"
                >
                  Members Dashboard
                </Button>
              )}

              {session && isUserAdmin(session.user.roles) ? (
                <Button
                  variant="default"
                  size="md"
                  className={classes.control}
                  component={Link}
                  href="/group/dashboard"
                >
                  Admin Dashboard
                </Button>
              ) : null}
            </Group>
          </div>
          <Image src={image.src} className={classes.image} alt={""} />
        </div>
      </Container>
    </div>
  );
}
