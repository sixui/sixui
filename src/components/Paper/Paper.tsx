import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperThemeFactory } from './Paper.css';
import type { IPaperFactory } from './Paper.types';
import { px } from '~/helpers/styles/px';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';
import { paperBaseTheme } from '../PaperBase/PaperBase.css';
import { paperTheme } from './Paper.css';

const COMPONENT_NAME = 'Paper';

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
      classNames,
      className,
      styles,
      style,
      variant,
      surface,
      shape,
      outlineStyle,
      outline,
      elevation,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useComponentTheme<IPaperThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: paperTheme,
    });

    return (
      <PaperBase
        {...getStyles('root', {
          style: assignInlineVars({
            ...createThemeSprinkle(
              paperBaseTheme.tokens.container.color.normal,
              surface,
              {
                ...themeTokens.colorScheme,
                transparent: 'transparent',
              },
            ),
            ...createThemeSprinkle(
              paperBaseTheme.tokens.container.elevation.normal,
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
              paperBaseTheme.tokens.outline.width.normal,
              outline,
              themeTokens.outline.width,
              px,
            ),
          }),
        })}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

Paper.theme = paperTheme;
Paper.displayName = `@sixui/${COMPONENT_NAME}`;
