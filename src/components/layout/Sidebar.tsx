'use client';

import { Navbar, ScrollArea, createStyles } from '@mantine/core';
import { IconGauge, IconUsers } from '@tabler/icons-react';
import { LinksGroup } from '@/components/LinkGroups';

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    link: '/dashboard',
  },
  {
    label: 'Members',
    icon: IconUsers,
    links: [
      { label: 'Invite new member', link: '/members/new-member' },
      { label: 'Member directory', link: '/members/directory' },
    ],
  },
];

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },
}));

export function Sidebar() {
  const { classes } = useStyles();
  const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar
      width={{ sm: 300 }}
      p="md"
      className={`${classes.navbar} min-h-full`}
    >
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={''}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}
