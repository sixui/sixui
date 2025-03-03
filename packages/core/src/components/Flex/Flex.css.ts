import { createRainbowSprinkles, defineProperties } from 'rainbow-sprinkles';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { cssLayers, themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { px } from '~/utils/css/px';
import { keys } from '~/utils/keys';
import { COMPONENT_NAME } from './Flex.constants';

const DENSITY = px(density({ min: -9, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
  },
});

const sprinklesProps = defineProperties({
  '@layer': cssLayers.sprinkles,
  dynamicProperties: {
    alignItems: true,
    flexDirection: true,
    justifyContent: true,
    flexWrap: true,
  },
  staticProperties: {
    columnGap: themeTokens.spacing,
    rowGap: keys(themeTokens.spacing).reduce(
      (acc, key) => ({
        ...acc,
        [key]: space(`$${key}`, DENSITY),
      }),
      {},
    ),
    gap: themeTokens.spacing,
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
