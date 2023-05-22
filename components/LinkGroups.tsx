'use client';

import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  }
}));

type LinkProps = {
  label: string;
  link: string;
};

type LinksGroupProps = {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
} & (
  | { link: string; links?: never }
  | { link?: never; links: LinkProps[] }
  );

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const isParent = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = IconChevronRight;

  const items = (isParent ? links : []).map((link) => (
    <Text<'a'>
      component='a'
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      {isParent && (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <Group position='apart' spacing={0}>
              <Box className={'flex items-center'}>
                <ThemeIcon variant='light' size={30}>
                  <Icon size='1.1rem' />
                </ThemeIcon>
                <Box ml='md'>{label}</Box>
              </Box>

              <ChevronIcon
                className={`transform duration-200`}
                size='1rem'
                stroke={1.5}
                style={{
                  transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none'
                }}
              />
            </Group>
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
      )}

      {link !== undefined && (
        <Link href={link}>
          <UnstyledButton className={classes.control}>
            <Group position='apart' spacing={0}>
              <Box className={'flex items-center'}>
                <ThemeIcon variant='light' size={30}>
                  <Icon size='1.1rem' />
                </ThemeIcon>
                <Box ml='md'>{label}</Box>
              </Box>
            </Group>
          </UnstyledButton>
        </Link>
      )}
    </>
  );
}

