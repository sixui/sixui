import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IFieldBaseVariant } from '../FieldBase';
import type { IColorInputFieldProps } from './ColorInputField.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ColorPaletteGroupProvider } from '../ColorPaletteGroup';
import { ComponentShowcase } from '../ComponentShowcase';
import { HctColorPickerContent } from '../HctColorPickerContent';
import { Stack } from '../Stack';
import { ColorInputField } from './ColorInputField';

const meta = {
  component: ColorInputField,
} satisfies Meta<typeof ColorInputField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  onColorsQuantized: (...args) => void sbHandleEvent('colorsQuantized', args),
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

export const PaletteGroup: IStory = {
  render: (props) => (
    <ColorPaletteGroupProvider customColors={['#ff2d55']}>
      <Stack gap={2} align="start">
        <ColorInputField {...props} />
        <ColorInputField {...props} customColors={['#000000']} />
        <ColorInputField {...props} />
      </Stack>
    </ColorPaletteGroupProvider>
  ),
  args: defaultArgs,
};

export default meta;
