import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import { Step, type IStepProps } from './Step';

const meta = {
  component: Step,
} satisfies Meta<typeof Step>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  index: 1,
} satisfies Partial<IStepProps>;

export const Basic: IStory = {
  render: (props) => <Step {...props} />,
  args: defaultArgs,
};

export const Completed: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    completed: true,
  },
};

export const WithIcon: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
  },
};

export const WithLabel: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
    label: 'Lorem ipsum dolor sit amet',
  },
};

export const WithLabelBottom: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
    label: 'Lorem ipsum dolor sit amet',
    labelPosition: 'bottom',
  },
};

export const WithSupportingText: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
    label: 'Lorem ipsum dolor sit amet',
    supportingText: 'Lorem ipsum dolor sit amet',
  },
};

export const Error: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    label: 'Lorem ipsum dolor sit amet',
    supportingText: 'Lorem ipsum dolor sit amet',
    hasError: true,
  },
};

export const ErrorWithIcon: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
    label: 'Lorem ipsum dolor sit amet',
    supportingText: 'Lorem ipsum dolor sit amet',
    hasError: true,
  },
};

export const Disabled: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    label: 'Lorem ipsum dolor sit amet',
    supportingText: 'Lorem ipsum dolor sit amet',
    disabled: true,
  },
};

export const DisabledWithIcon: IStory = {
  render: (props) => <Step {...props} />,
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faGear} />,
    label: 'Lorem ipsum dolor sit amet',
    supportingText: 'Lorem ipsum dolor sit amet',
    disabled: true,
  },
};

export default meta;
