import type { Meta, StoryObj } from '@storybook/react';
import { faCheck, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { INavigationDrawerDestinationProps } from './NavigationDrawerDestination.types';
import { Avatar } from '~/components/Avatar';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { NavigationDrawerDestination } from './NavigationDrawerDestination';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: NavigationDrawerDestination,
} satisfies Meta<typeof NavigationDrawerDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  outlineStyle: 'dashed',
  w: '$48',
} satisfies Partial<INavigationDrawerDestinationProps>;

const states: Array<IComponentPresentation<INavigationDrawerDestinationProps>> =
  [
    { legend: 'Normal', props: { children: 'Normal' } },
    {
      legend: 'Focused',
      props: { children: 'Focused', interactions: { focused: true } },
    },
    {
      legend: 'Hovered',
      props: { children: 'Hovered', interactions: { hovered: true } },
    },
    {
      legend: 'Pressed',
      props: { children: 'Pressed', interactions: { pressed: true } },
    },
    { legend: 'Active', props: { children: 'Active', active: true } },
    { legend: 'Loading', props: { children: 'Loading', loading: true } },
    { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
  ];

const rows: Array<IComponentPresentation<INavigationDrawerDestinationProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With leading icon',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faCheck} />,
    },
  },
  {
    legend: 'With trailing icon',
    props: {
      trailingIcon: <FontAwesomeIcon icon={faLink} />,
    },
  },
  {
    legend: 'With leading element',
    props: {
      leading: <Avatar>A</Avatar>,
    },
  },
  {
    legend: 'With leading image',
    props: {
      leadingImage:
        'https://images.unsplash.com/photo-1554494583-c4e1649bfe71?q=80&h=168&w=168',
    },
  },
  {
    legend: 'With leading video',
    props: {
      leadingVideo: [
        {
          type: 'video/webm',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        },
        {
          type: 'video/mp4',
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        },
      ],
    },
  },
  {
    legend: 'With overline',
    props: {
      overline: 'Overline',
    },
  },
  {
    legend: 'With supporting text',
    props: {
      supportingText: 'Supporting text',
    },
  },
  {
    legend: 'With badge label',
    props: {
      badgeLabel: '100+',
    },
  },
];

const NavigationDrawerDestinationShowcase = componentShowcaseFactory(
  NavigationDrawerDestination,
);

export const Configurations: IStory = {
  render: (props) => (
    <NavigationDrawerDestinationShowcase
      horizontalAlign="start"
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'Label',
  },
};

export default meta;
