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

const getValue = <TValue extends string>(
  value: `$${TValue}`,
  map: Record<TValue, string>,
  transformer?: (value: string) => string,
): string => {
  const mappedValue = value.startsWith('$')
    ? map[value.slice(1) as TValue]
    : value;

  return transformer?.(mappedValue) ?? mappedValue;
};

const createThemeSprinkle = <TKey extends string>(
  cssVar: string,
  key: `$${TKey}` | undefined,
  mappedValues: Record<TKey, string>,
  transformer?: (value: string) => string,
): Record<string, string> | undefined =>
  key ? { [cssVar]: getValue(key, mappedValues, transformer) } : undefined;

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
      theme: paperTheme,
      variant,
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
