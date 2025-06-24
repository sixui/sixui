import type { Meta, StoryObj } from '@storybook/react-vite';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IColorInputControlProps } from './ColorInputControl.types';
import { ColorPaletteGroupProvider } from '~/components/ColorPaletteGroup';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { HctColorPickerContent } from '~/components/HctColorPickerContent';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { ColorInputControl } from './ColorInputControl';

const meta = {
  component: ColorInputControl,
} satisfies Meta<typeof ColorInputControl>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => sbHandleEvent('change', args),
  onColorsQuantized: (...args) => void sbHandleEvent('colorsQuantized', args),
  w: '256px',
} satisfies Partial<IColorInputControlProps>;

const ColorInputControlShowcase = componentShowcaseFactory(ColorInputControl);

const cols: Array<IComponentPresentation<IColorInputControlProps>> = [
  { props: { variant: 'filled', placeholder: 'Filled' } },
  { props: { variant: 'outlined', placeholder: 'Outlined' } },
];

export const Variants: IStory = {
  render: (props) => <ColorInputControlShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export const HctVariants: IStory = {
  render: (props) => (
    <ColorInputControlShowcase
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
    <ColorInputControlShowcase
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
      <Flex direction="column" gap="$sm" align="flex-start">
        <ColorInputControl {...props} />
        <ColorInputControl {...props} customPalette={['#000000']} />
        <ColorInputControl {...props} />
      </Flex>
    </ColorPaletteGroupProvider>
  ),
  args: defaultArgs,
};

export default meta;
