import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { ITextAreaFieldProps } from './TextAreaField.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { TextAreaField } from './TextAreaField';

const meta = {
  component: TextAreaField,
} satisfies Meta<typeof TextAreaField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(260),
  onChange: (...args) => void sbHandleEvent('onChange', args),
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
  { legend: 'Loading', props: { loading: true } },
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

export const Scales: IStory = {
  render: (props) => (
    <TextAreaFieldShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <TextAreaFieldShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
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
