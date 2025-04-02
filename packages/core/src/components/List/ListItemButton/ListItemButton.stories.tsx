import type { Meta, StoryObj } from '@storybook/react';
import {
  faCalendarDays,
  faCheck,
  faChevronRight,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IListItemButtonProps } from './ListItemButton.types';
import { Avatar } from '~/components/Avatar';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { ListItemButton } from './ListItemButton';
import { listItemButtonVariants } from './ListItemButton.types';

const meta = {
  component: ListItemButton,
} satisfies Meta<typeof ListItemButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  outlineStyle: 'dashed',
  w: '160px',
} satisfies Partial<IListItemButtonProps>;

const states: Array<IComponentPresentation<IListItemButtonProps>> = [
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
  { legend: 'Active', props: { children: 'Selected', active: true } },
  { legend: 'Selected', props: { children: 'Selected', selected: true } },
  { legend: 'Loading', props: { children: 'Loading', loading: true } },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IListItemButtonProps>> = [
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
    legend: 'With trailing supporting text',
    props: {
      trailingSupportingText: '100+',
    },
  },
];

const ListItemButtonShowcase = componentShowcaseFactory(ListItemButton);

export const Variants: IStory = {
  render: (props) => (
    <ListItemButtonShowcase
      props={props}
      cols={listItemButtonVariants.map((variant) => ({
        props: {
          variant,
          children: capitalizeFirstLetter(variant),
          leadingIcon: <FontAwesomeIcon icon={faCalendarDays} />,
          trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Standard: IStory = {
  render: (props) => (
    <ListItemButtonShowcase
      horizontalAlign="start"
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'standard',
    children: 'Label',
  },
};

export const Danger: IStory = {
  render: (props) => (
    <ListItemButtonShowcase
      horizontalAlign="start"
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'danger',
    children: 'Label',
  },
};

export default meta;
