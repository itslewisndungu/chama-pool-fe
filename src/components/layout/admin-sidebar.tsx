"use client";

import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import {
  IconGauge,
  IconUsers,
  IconCalendar,
  IconBuildingBank,
} from "@tabler/icons-react";
import { LinksGroup } from "@/components/LinkGroups";

const routes = [
  {
    label: "Dashboard",
    icon: IconGauge,
    link: "/group/dashboard",
  },
  {
    label: "Members",
    icon: IconUsers,
    links: [
      { label: "Invite new member", link: "/group/members/new-member" },
      { label: "Member directory", link: "/group/members/directory" },
    ],
  },
  {
    label: "Meetings",
    icon: IconCalendar,
    links: [
      { label: "Meetings list", link: "/group/meetings" },
      { label: "Schedule meeting", link: "/group/meetings/schedule" },
    ],
  },
  {
    label: "Loans",
    icon: IconBuildingBank,
    links: [
      { label: "Loan Applications", link: "/group/loans/applications" },
      { label: "Group loans", link: "/group/loans/listings/group-loans" },
    ],
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

export function AdminSidebar() {
  const { classes } = useStyles();
  const links = routes.map(item => <LinksGroup {...item} key={item.label} />);

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
