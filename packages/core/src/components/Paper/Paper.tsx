import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperFactory } from './Paper.types';
import { PaperBase } from '~/components/PaperBase';
import { useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { px } from '~/utils/css/px';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { paperBaseTheme } from '~/components/PaperBase/PaperBase.css';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Paper.constants';

const getValue = <TKey extends string>(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  key: `$${TKey}` | string,
  map?: Record<TKey, string>,
  transformer?: (value: string) => string,
): string => {
  const mappedValue = key.startsWith('$')
    ? (map?.[key.slice(1) as TKey] ?? key)
    : key;

  return transformer?.(mappedValue) ?? mappedValue;
};

const createThemeSprinkle = <TKey extends string>(
  cssVar: string,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  key: `$${TKey}` | string | undefined,
  map?: Record<TKey, string>,
  transformer?: (value: string) => string,
): Record<string, string> | undefined =>
  key ? { [cssVar]: getValue<TKey>(key, map, transformer) } : undefined;

export const Paper = polymorphicComponentFactory<IPaperFactory>(
  (props, forwardedRef) => {
    const {
      surface,
      shape,
      outlineStyle,
      outlineColor,
      outline,
      elevation,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <PaperBase
        style={assignInlineVars({
          ...createThemeSprinkle(
            paperBaseTheme.tokens.container.color,
            surface,
            themeTokens.colorScheme,
          ),
          ...createThemeSprinkle(
            paperBaseTheme.tokens.container.elevation,
            elevation,
            elevationLevelPreset,
          ),
          ...createThemeSprinkle(
            paperBaseTheme.tokens.container.shape,
            shape,
            themeTokens.shape.corner,
            px,
          ),
          ...createThemeSprinkle(
            paperBaseTheme.tokens.outline.style,
            outlineStyle,
          ),
          ...createThemeSprinkle(
            paperBaseTheme.tokens.outline.color,
            outlineColor,
            themeTokens.colorScheme,
          ),
          ...createThemeSprinkle(
            paperBaseTheme.tokens.outline.width,
            outline,
            themeTokens.outline.width,
            px,
          ),
        })}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

Paper.displayName = `@sixui/core/${COMPONENT_NAME}`;
