import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperFactory } from './Paper.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import {
  paperTheme,
  paperSprinkles,
  paperBackgroundSprinkles,
  paperElevationSprinkles,
  paperOutlineSprinkles,
  type IPaperThemeFactory,
} from './Paper.css';

const COMPONENT_NAME = 'Paper';

export const Paper = polymorphicComponentFactory<IPaperFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      density,
      ...otherWithSprinkles
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sprinkles = paperSprinkles(otherWithSprinkles);
    const backgroundSprinkles = paperBackgroundSprinkles(sprinkles.otherProps);
    const elevationSprinkles = paperElevationSprinkles(
      backgroundSprinkles.otherProps,
    );
    const outlineSprinkles = paperOutlineSprinkles(
      elevationSprinkles.otherProps,
    );
    const other = outlineSprinkles.otherProps;

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
        {...other}
        {...getStyles('root', {
          className: sprinkles.className,
          style: {
            ...sprinkles.style,
            ...assignInlineVars({
              [themeTokens.density.scale]: density
                ? String(density)
                : undefined,
            }),
          },
        })}
        classNames={mergeClassNames(classNames, {
          background: backgroundSprinkles.className,
          elevation: elevationSprinkles.className,
          outline: outlineSprinkles.className,
        })}
        styles={{
          background: backgroundSprinkles.style,
          elevation: elevationSprinkles.style,
          outline: outlineSprinkles.style,
        }}
        ref={forwardedRef}
      />
    );
  },
);

Paper.theme = paperTheme;
Paper.displayName = `@sixui/${COMPONENT_NAME}`;
