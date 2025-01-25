import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IColorInputFieldProps } from './ColorInputField.types';
import { ColorPaletteGroupProvider } from '~/components/ColorPaletteGroup';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { HctColorPickerContent } from '~/components/HctColorPickerContent';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ColorInputField } from './ColorInputField';

const meta = {
  component: ColorInputField,
} satisfies Meta<typeof ColorInputField>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args),
  onColorsQuantized: (...args) => void sbHandleEvent('colorsQuantized', args),
} satisfies Partial<IColorInputFieldProps>;

const ColorInputFieldShowcase = componentShowcaseFactory(ColorInputField);

const cols: Array<IComponentPresentation<IColorInputFieldProps>> = [
  { props: { variant: 'filled', placeholder: 'Filled' } },
  { props: { variant: 'outlined', placeholder: 'Outlined' } },
];

export const Variants: IStory = {
  render: (props) => <ColorInputFieldShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export const HctVariants: IStory = {
  render: (props) => (
    <ColorInputFieldShowcase
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
    <ColorInputFieldShowcase
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
    <ColorPaletteGroupProvider customPalette={['#ff2d55']}>
      <Flex direction="column" gap="$2" align="start">
        <ColorInputField {...props} />
        <ColorInputField {...props} customPalette={['#000000']} />
        <ColorInputField {...props} />
      </Flex>
    </ColorPaletteGroupProvider>
  ),
  args: defaultArgs,
};

export default meta;
