import type { Meta, StoryObj } from '@storybook/react';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IDisclosureButtonProps } from './DisclosureButton.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { DisclosureButton } from './DisclosureButton';

const meta = {
  component: DisclosureButton,
} satisfies Meta<typeof DisclosureButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Advanced settings',
  onClick: (...args) => void sbHandleEvent('onClick', args, 1000),
  onChange: (...args) => sbHandleEvent('onChange', args, 1000),
} satisfies Partial<IDisclosureButtonProps>;

const rows: Array<IComponentPresentation<IDisclosureButtonProps>> = [
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
    legend: 'Checkable',
    props: {
      checkable: true,
    },
  },
  {
    legend: 'Checkable (toggled on)',
    props: {
      checkable: true,
      defaultChecked: true,
    },
  },
  {
    legend: 'Switchable',
    props: {
      switchable: true,
    },
  },
  {
    legend: 'Switchable (toggled on)',
    props: {
      switchable: true,
      defaultChecked: true,
    },
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
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
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const DisclosureButtonShowcase = componentShowcaseFactory(DisclosureButton);

export const Configurations: IStory = {
  render: (props) => <DisclosureButtonShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export default meta;
