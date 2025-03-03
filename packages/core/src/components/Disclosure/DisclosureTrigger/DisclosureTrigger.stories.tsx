import type { Meta, StoryObj } from '@storybook/react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IDisclosureTriggerProps } from './DisclosureTrigger.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { DisclosureTrigger } from './DisclosureTrigger';

const meta = {
  component: DisclosureTrigger,
} satisfies Meta<typeof DisclosureTrigger>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Advanced settings',
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
  w: '384px',
} satisfies Partial<IDisclosureTriggerProps>;

const cols: Array<IComponentPresentation<IDisclosureTriggerProps>> = [
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

const rows: Array<IComponentPresentation<IDisclosureTriggerProps>> = [
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

const DisclosureTriggerShowcase = componentShowcaseFactory(DisclosureTrigger);

export const Configurations: IStory = {
  render: (props) => (
    <DisclosureTriggerShowcase props={props} cols={cols} rows={rows} />
  ),
  args: defaultArgs,
};

export default meta;
