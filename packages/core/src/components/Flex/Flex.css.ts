import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { cssLayers } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { getSpacingValues } from '~/utils/css/getSpacingValues';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Flex.constants';

const DENSITY = px(density({ min: -9, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
  },
});

const spacingValues = getSpacingValues();
const spacingValuesWithDensity = getSpacingValues(DENSITY);

const sprinklesProps = defineProperties({
  '@layer': cssLayers.sprinkles,
  dynamicProperties: {
    alignItems: true,
    flexDirection: true,
    justifyContent: true,
    flexWrap: true,
  },
  staticProperties: {
    columnGap: spacingValues,
    rowGap: spacingValuesWithDensity,
    gap: spacingValues,
  },
  shorthands: {
    align: ['alignItems'],
    direction: ['flexDirection'],
    justify: ['justifyContent'],
    wrap: ['flexWrap'],
  },
});

export const flexSprinkles = createRainbowSprinkles(sprinklesProps);

export type IFlexSprinkles = Pick<
  Parameters<typeof flexSprinkles>[0],
  'align' | 'columnGap' | 'direction' | 'gap' | 'justify' | 'rowGap' | 'wrap'
>;

export type IFlexThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const flexTheme = componentThemeFactory<IFlexThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
