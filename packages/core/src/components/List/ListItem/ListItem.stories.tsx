import type { Meta, StoryObj } from '@storybook/react-vite';
import { faCheck, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IListItemProps } from './ListItem.types';
import { Avatar } from '~/components/Avatar';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ListItem } from './ListItem';

const meta = {
  component: ListItem,
  args: {
    w: '160px',
  },
} satisfies Meta<typeof ListItem>;

type IStory = StoryObj<typeof meta>;

const states: Array<IComponentPresentation<IListItemProps>> = [
  { legend: 'Normal', props: { children: 'Normal' } },
  { legend: 'Active', props: { children: 'Selected', active: true } },
  { legend: 'Selected', props: { children: 'Selected', selected: true } },
  { legend: 'Loading', props: { children: 'Loading', loading: true } },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IListItemProps>> = [
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

const ListItemShowcase = componentShowcaseFactory(ListItem);

export const Basic: IStory = {
  render: (props) => (
    <ListItemShowcase
      horizontalAlign="start"
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    children: 'Label',
  },
};

export default meta;
