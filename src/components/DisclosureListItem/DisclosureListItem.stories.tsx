import type { Meta, StoryObj } from '@storybook/react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IDisclosureListItemProps } from './DisclosureListItem.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { DisclosureListItem } from './DisclosureListItem';

const meta = {
  component: DisclosureListItem,
} satisfies Meta<typeof DisclosureListItem>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Advanced settings',
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
  w: '$96',
} satisfies Partial<IDisclosureListItemProps>;

const cols: Array<IComponentPresentation<IDisclosureListItemProps>> = [
  {
    legend: 'Standard',
  },
  {
    legend: 'Checkable',
    props: {
      checkable: true,
    },
  },
  {
    legend: 'Switchable',
    props: {
      switchable: true,
    },
  },
];

const rows: Array<IComponentPresentation<IDisclosureListItemProps>> = [
  {
    legend: 'Collapsed',
    props: {
      expanded: false,
    },
  },
  {
    legend: 'Expanded',
    props: {
      expanded: true,
    },
  },
  {
    legend: 'Checked',
    props: {
      defaultChecked: true,
    },
    hiddenIndexes: [0],
  },
  {
    legend: 'Custom expand icon',
    props: {
      expandIcon: <FontAwesomeIcon icon={faArrowDown} />,
    },
  },
  {
    legend: 'Custom expand icon (expanded)',
    props: {
      expandIcon: <FontAwesomeIcon icon={faArrowDown} />,
      expanded: true,
    },
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const DisclosureListItemShowcase = componentShowcaseFactory(DisclosureListItem);

export const Configurations: IStory = {
  render: (props) => (
    <DisclosureListItemShowcase props={props} cols={cols} rows={rows} />
  ),
  args: defaultArgs,
};

export default meta;
