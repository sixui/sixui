import type { Meta, StoryObj } from '@storybook/react';

import type { IHslColorPickerContentProps } from './HslColorPickerContent.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { HslColorPickerContent } from './HslColorPickerContent';

const meta = {
  component: HslColorPickerContent,
} satisfies Meta<typeof HslColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args),
} satisfies Partial<IHslColorPickerContentProps>;

const HslColorPickerContentShowcase = componentShowcaseFactory(
  HslColorPickerContent,
);

export const Basic: IStory = {
  render: (props) => <HslColorPickerContentShowcase props={props} />,
  args: defaultArgs,
};

export const HideNeutral: IStory = {
  render: (props) => <HslColorPickerContentShowcase props={props} />,
  args: {
    ...defaultArgs,
    hideNeutral: true,
  },
};

export const Desaturated: IStory = {
  render: (props) => <HslColorPickerContentShowcase props={props} />,
  args: {
    ...defaultArgs,
    saturation: 40,
  },
};

export default meta;
