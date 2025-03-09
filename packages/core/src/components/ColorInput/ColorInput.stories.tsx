import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IColorInputProps } from './ColorInput.types';
import { ColorPaletteGroupProvider } from '~/components/ColorPaletteGroup';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { HctColorPickerContent } from '~/components/HctColorPickerContent';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { ColorInput } from './ColorInput';

const meta = {
  component: ColorInput,
} satisfies Meta<typeof ColorInput>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args),
  onColorsQuantized: (...args) => void sbHandleEvent('colorsQuantized', args),
  w: '16px8',
} satisfies Partial<IColorInputProps>;

const ColorInputShowcase = componentShowcaseFactory(ColorInput);

const cols: Array<IComponentPresentation<IColorInputProps>> = [
  { props: { variant: 'filled', placeholder: 'Filled' } },
  { props: { variant: 'outlined', placeholder: 'Outlined' } },
];

export const Variants: IStory = {
  render: (props) => <ColorInputShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export const HctVariants: IStory = {
  render: (props) => (
    <ColorInputShowcase
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
    <ColorInputShowcase
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
      <Flex direction="column" gap="$sm" align="start">
        <ColorInput {...props} />
        <ColorInput {...props} customPalette={['#000000']} />
        <ColorInput {...props} />
      </Flex>
    </ColorPaletteGroupProvider>
  ),
  args: defaultArgs,
};

export default meta;
