import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IColorInputFieldProps } from './ColorInputField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ColorInputField } from './ColorInputField';

const meta = {
  component: ColorInputField,
} satisfies Meta<typeof ColorInputField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args, 1000),
  onColorsQuantized: (...args) => void sbHandleEvent('colorsQuantized', args),
} satisfies Partial<IColorInputFieldProps>;

const variants: Array<IComponentPresentation<IColorInputFieldProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IColorInputFieldProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ColorInputFieldShowcase = componentShowcaseFactory(ColorInputField);

export const Basic: IStory = {
  render: (props) => (
    <ColorInputFieldShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
