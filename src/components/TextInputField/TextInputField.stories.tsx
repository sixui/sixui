import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import type { ITextInputFieldProps } from './TextInputField.types';
import type { IFieldBaseVariant } from '../FieldBase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { IconButton } from '../IconButton';
import { TextInputField } from './TextInputField';

const meta = {
  component: TextInputField,
} satisfies Meta<typeof TextInputField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: px(260),
  onChange: (...args) => void sbHandleEvent('change', args),
  onValueChange: (...args) => void sbHandleEvent('valueChange', args),
} satisfies Partial<ITextInputFieldProps>;

const states: Array<IComponentPresentation<ITextInputFieldProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ITextInputFieldProps>> = [
  { legend: 'Empty' },
  { legend: 'Label', props: { label: 'Label' } },
  { legend: 'Placeholder', props: { placeholder: 'Placeholder' } },
  {
    legend: 'Value',
    props: {
      defaultValue: 'Value',
      prefixText: '$',
      suffixText: '.00',
    },
  },
  { legend: 'Clearable', props: { clearable: true } },
  {
    legend: 'Password',
    props: { type: 'password' },
  },
  {
    legend: 'Date',
    props: { type: 'datetime-local' },
  },
  {
    legend: 'Color',
    props: { type: 'color', defaultValue: '#0000ff' },
  },
  { legend: 'Error', props: { defaultValue: 'Value', hasError: true } },
];

const TextInputFieldShowcase = makeComponentShowcase(TextInputField);

// FIXME: delete
export const Test: IStory = {
  render: (props) => (
    <TextInputFieldShowcase
      props={props}
      cols={(['filled', 'outlined'] as Array<IFieldBaseVariant>).map(
        (variant) => ({
          props: {
            variant,
          },
        }),
      )}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'test',
    end: <IconButton icon={<FontAwesomeIcon icon={faXmark} />} />,
    type: 'number',
  },
};

export const Variants: IStory = {
  render: (props) => (
    <TextInputFieldShowcase
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

// export const Filled: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={TextInputField}
//       props={props}
//       cols={states}
//       rows={rows}
//     />
//   ),
//   args: {
//     ...defaultArgs,
//     variant: 'filled',
//   },
// };

// export const Outlined: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={TextInputField}
//       props={props}
//       cols={states}
//       rows={rows}
//     />
//   ),
//   args: {
//     ...defaultArgs,
//     variant: 'outlined',
//   },
// };

export default meta;
