import type { Meta, StoryObj } from '@storybook/react';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFluidButtonProps } from './FluidButton.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Text } from '../Text';
import { FluidButton } from './FluidButton';

const meta = {
  component: FluidButton,
} satisfies Meta<typeof FluidButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  // disabled: true,
} satisfies Partial<IFluidButtonProps>;

const FluidButtonInText: React.FC<IFluidButtonProps> = (props) => (
  <>
    Lorem ipsum dolor sit amet <FluidButton {...props} />, consectetur
    adipiscing elit
  </>
);

const rows: Array<IComponentPresentation<IFluidButtonProps>> = [
  {
    component: (props) => (
      <Text variant="display">
        <FluidButtonInText {...props} />
      </Text>
    ),
  },
  {
    component: (props) => (
      <Text variant="headline">
        <FluidButtonInText {...props} />
      </Text>
    ),
  },
  {
    component: (props) => (
      <Text variant="title">
        <FluidButtonInText {...props} />
      </Text>
    ),
  },
  {
    component: (props) => (
      <Text variant="body">
        <FluidButtonInText {...props} />
      </Text>
    ),
  },
  {
    component: (props) => (
      <Text variant="label">
        <FluidButtonInText {...props} />
      </Text>
    ),
  },
];

export const WithText: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FluidButton}
      horizontalAlign="start"
      props={props}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'click me',
  },
};

export const WithTextDisabled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FluidButton}
      horizontalAlign="start"
      props={props}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'click me',
    disabled: true,
  },
};

export const WithIcon: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FluidButton}
      horizontalAlign="start"
      props={props}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: <FontAwesomeIcon icon={faCopy} />,
  },
};

export const IconDisabled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={FluidButton}
      horizontalAlign="start"
      props={props}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: <FontAwesomeIcon icon={faCopy} />,
    disabled: true,
  },
};

export default meta;
