import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { Typography } from '@/components/atoms/Typography';
import { FluidButton, type IFluidButtonProps } from './FluidButton';

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
      <Typography variant='display'>
        <FluidButtonInText {...props} />
      </Typography>
    ),
  },
  {
    component: (props) => (
      <Typography variant='headline'>
        <FluidButtonInText {...props} />
      </Typography>
    ),
  },
  {
    component: (props) => (
      <Typography variant='title'>
        <FluidButtonInText {...props} />
      </Typography>
    ),
  },
  {
    component: (props) => (
      <Typography variant='body'>
        <FluidButtonInText {...props} />
      </Typography>
    ),
  },
  {
    component: (props) => (
      <Typography variant='label'>
        <FluidButtonInText {...props} />
      </Typography>
    ),
  },
];

export const Text: IStory = {
  render: (props) => (
    <ComponentShowcase
      horizontalAlign='start'
      component={FluidButton}
      props={props}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'click me',
  },
};

export const TextDisabled: IStory = {
  render: (props) => (
    <ComponentShowcase
      horizontalAlign='start'
      component={FluidButton}
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

export const Icon: IStory = {
  render: (props) => (
    <ComponentShowcase
      horizontalAlign='start'
      component={FluidButton}
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
      horizontalAlign='start'
      component={FluidButton}
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
