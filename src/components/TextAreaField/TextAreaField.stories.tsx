import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFieldBaseVariant } from '../FieldBase';
import type { ITextAreaFieldProps } from './TextAreaField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { TextAreaField } from './TextAreaField';

const meta = {
  component: TextAreaField,
} satisfies Meta<typeof TextAreaField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(260),
  onChange: (...args) => void sbHandleEvent('onChange', args),
  onValueChange: (...args) => void sbHandleEvent('onValueChange', args),
} satisfies Partial<ITextAreaFieldProps>;

const states: Array<IComponentPresentation<ITextAreaFieldProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  { legend: 'Read only', props: { readOnly: true } },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ITextAreaFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Label', props: { label: 'Label' } },
  {
    legend: 'Placeholder',
    props: { label: 'Label', placeholder: 'Placeholder' },
  },
  {
    legend: 'Default value',
    props: {
      defaultValue: 'Value',
    },
  },
  { legend: 'Clearable', props: { clearable: true } },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

const TextAreaFieldShowcase = componentShowcaseFactory(TextAreaField);

export const Variants: IStory = {
  render: (props) => (
    <TextAreaFieldShowcase
      props={props}
      cols={(['filled', 'outlined'] as Array<IFieldBaseVariant>).map(
        (variant) => ({
          props: {
            variant,
            label: capitalizeFirstLetter(variant),
          },
        }),
      )}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <TextAreaFieldShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <TextAreaFieldShowcase props={props} cols={states} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
