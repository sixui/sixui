import type { Meta, StoryObj } from '@storybook/react';

import type { IResizableProps } from './Resizable.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { Resizable } from './Resizable';

const meta = {
  component: Resizable,
} satisfies Meta<typeof Resizable>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder diagonals expanded />,
  defaultWidth: 300,
  defaultHeight: 300,
  minWidth: 100,
  minHeight: 100,
} satisfies Partial<IResizableProps>;

const ResizableShowcase = componentShowcaseFactory(Resizable);

export const Basic: IStory = {
  render: (props) => <ResizableShowcase props={props} />,
  args: defaultArgs,
};

export const Horizontal: IStory = {
  render: (props) => <ResizableShowcase props={props} />,
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
  },
};

export const Vertical: IStory = {
  render: (props) => <ResizableShowcase props={props} />,
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export const HandleLocation: IStory = {
  render: (props) => (
    <ResizableShowcase
      props={props}
      cols={[
        { legend: 'Inside', props: { handleLocation: 'inside' } },
        { legend: 'Center', props: { handleLocation: 'center' } },
        { legend: 'Outside', props: { handleLocation: 'outside' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    defaultWidth: 150,
    defaultHeight: 150,
  },
};

export default meta;
