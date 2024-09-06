import { defineProperties, createRainbowSprinkles } from 'rainbow-sprinkles';
import { spacingValues } from '~/helpers/styles/spacingValues';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  root: {
    display: 'flex',
  },
});

const sprinklesProps = defineProperties({
  dynamicProperties: {
    alignItems: true,
    flexDirection: true,
    justifyContent: true,
    flexWrap: true,
  },
  staticProperties: {
    columnGap: spacingValues,
    rowGap: spacingValues,
    gap: spacingValues,
  },
  shorthands: {
    align: ['alignItems'],
    columnGap: ['columnGap'],
    direction: ['flexDirection'],
    justify: ['justifyContent'],
    rowGap: ['rowGap'],
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
