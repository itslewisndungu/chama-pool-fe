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
    link: "/member/dashboard",
  },
  {
    label: "Members",
    icon: IconUsers,
    links: [{ label: "Member directory", link: "/member/members/directory" }],
  },
  {
    label: "Profile",
    icon: IconUsers,
    links: [
      { label: "Your profile", link: "/member/dashboard" },
      { label: "Contributions", link: "/member/dashboard" },
      { label: "Fines", link: "/member/dashboard" },
    ],
  },
  {
    label: "Meetings",
    icon: IconCalendar,
    link: "/member/meetings",
  },
  {
    label: "Loans",
    icon: IconBuildingBank,
    links: [
      {
        label: "My loans",
        link: "/member/loans/listings/my-loans",
      },
      {
        label: "Loans applications",
        link: "/member/loans/applications/pending-application",
      },
      {
        label: "Apply for loan",
        link: "/member/loans/new-loan",
      },
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

export function MemberSidebar() {
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
