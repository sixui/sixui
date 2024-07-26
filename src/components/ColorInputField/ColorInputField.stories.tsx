import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IColorInputFieldProps } from './ColorInputField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ComponentShowcase } from '~/components/ComponentShowcase';
import { HctColorPickerContent } from '~/components/HctColorPickerContent';
import { ColorInputField } from './ColorInputField';

const meta = {
  component: ColorInputField,
} satisfies Meta<typeof ColorInputField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
} satisfies Partial<IColorInputFieldProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ColorInputField}
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

export const HctVariants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ColorInputField}
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
  args: {
    ...defaultArgs,
    colorPickerRenderer: (props) => <HctColorPickerContent {...props} />,
  },
};

export const WithErrorText: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ColorInputField}
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
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
