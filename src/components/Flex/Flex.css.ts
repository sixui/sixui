import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { getSpacingValues } from '~/helpers/styles/getSpacingValues';
import { createStyles } from '~/utils/styles/createStyles';

const DENSITY = px(getDensity({ min: -9, max: 0 }));

const classNames = createStyles({
  root: {
    display: 'flex',
  },
});

const spacingValues = getSpacingValues();
const spacingValuesWithDensity = getSpacingValues(DENSITY);

const sprinklesProps = defineProperties({
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
  tokens: undefined,
});
