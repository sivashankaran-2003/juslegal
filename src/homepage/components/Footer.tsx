import Link from "next/link";
import React from 'react';
import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';
import { Links } from './links';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

// interface FooterSimpleProps {
//   links: { link: string; label: string }[];
// }

export default function FooterSimple() {
  const { classes } = useStyles();
  const items = Links.map((link) => (
    <Anchor
      component={Link}
      color="dimmed"
      key={link.label}
      href={link.link}
    //   onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="sm" color="white">
            © {new Date().getFullYear()} Lawyer App
        </Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}