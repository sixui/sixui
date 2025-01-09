import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ColorPickerContent } from './ColorPickerContent';

const meta = {
  component: ColorPickerContent,
} satisfies Meta<typeof ColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'ColorPickerContent',
} satisfies Partial<IColorPickerContentProps>;

const variants: Array<IComponentPresentation<IColorPickerContentProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IColorPickerContentProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ColorPickerContentShowcase = componentShowcaseFactory(ColorPickerContent);

export const Basic: IStory = {
  render: (props) => (
    <ColorPickerContentShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
