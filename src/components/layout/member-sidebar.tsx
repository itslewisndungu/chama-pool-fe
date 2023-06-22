"use client";

import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import {
  IconGauge,
  IconUsers,
  IconCalendar,
  IconBuildingBank,
} from "@tabler/icons-react";
import { LinksGroup } from "@/components/LinkGroups";

const mockdata = [
  {
    label: "Dashboard",
    icon: IconGauge,
    link: "/dashboard",
  },
  {
    label: "Members",
    icon: IconUsers,
    links: [
      { label: "Invite new member", link: "/members/new-member" },
      { label: "Member directory", link: "/members/directory" },
    ],
  },
  {
    label: "Meetings",
    icon: IconCalendar,
    link: "/meetings",
  },
  {
    label: "Loans",
    icon: IconBuildingBank,
    links: [{ label: "New loan", link: "/loans/new-loan" }],
  },
];

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    zIndex: 0,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },
}));

export function MemberSidebar() {
  const { classes } = useStyles();
  const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar
      width={{ sm: 300 }}
      p="md"
      className={`${classes.navbar} min-h-full z-0!`}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={""}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
