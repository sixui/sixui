import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextAreaFieldProps } from './TextAreaField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { scaleTokens } from '~/themes/base/scale.stylex';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import type { IFieldBaseVariant } from '../FieldBase';
import { TextAreaField } from './TextAreaField';

const meta = {
  component: TextAreaField,
} satisfies Meta<typeof TextAreaField>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: `calc(260px * ${scaleTokens.scale})`,
  },
});

const defaultArgs = {
  sx: styles.host,
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextAreaFieldProps>;

const states: Array<IComponentPresentation<ITextAreaFieldProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  {
    legend: 'Hovered',
    props: { visualState: { hovered: true } },
  },
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
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  { legend: 'Clearable', props: { clearable: true } },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextAreaField}
      props={props}
      cols={(['filled', 'outlined'] as Array<IFieldBaseVariant>).map(
        (variant) => ({
          props: {
            variant,
            placeholder: capitalizeFirstLetter(variant),
          },
        }),
      )}
    />
  ),
  args: defaultArgs,
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextAreaField}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={TextAreaField}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
