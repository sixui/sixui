import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import {
  DisclosureButton,
  type IDisclosureButtonProps,
} from './DisclosureButton';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';

const meta = {
  component: DisclosureButton,
} satisfies Meta<typeof DisclosureButton>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 680,
  },
});

const defaultArgs = {
  children: 'Advanced settings',
  onClick: (...args) => void sbHandleEvent('click', args),
  onChange: (...args) => sbHandleEvent('change', args, 1000),
  sx: styles.host,
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
      defaultValue: true,
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
      defaultValue: true,
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

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase component={DisclosureButton} rows={rows} props={props} />
  ),
  args: defaultArgs,
};

export default meta;
