import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IItemThemeFactory } from './Item.css';
import type { IItemFactory } from './Item.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Item.constants';
import { itemTheme } from './Item.css';

/**
 * @see https://m3.material.io/components/items/overview
 */
export const Item = polymorphicComponentFactory<IItemFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      start,
      overline,
      children,
      supportingText,
      trailingSupportingText,
      end,
      lineClamp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: itemTheme,
      modifiers: {
        'line-clamp': lineClamp,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {start && (
          <div {...getStyles('section')} data-section="start">
            {start}
          </div>
        )}

        <div {...getStyles('section')} data-section="main">
          <div
            {...getStyles('main', {
              style: lineClamp
                ? assignInlineVars({
                    [itemTheme.tokens.lineClamp]: String(lineClamp),
                  })
                : undefined,
            })}
          >
            {overline && <div {...getStyles('overline')}>{overline}</div>}
            <div {...getStyles('label')}>{children}</div>
            {supportingText && (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            )}
          </div>
        </div>

        {trailingSupportingText && (
          <div {...getStyles('section')} data-section="trailingSupportingText">
            {trailingSupportingText}
          </div>
        )}

        {end && (
          <div {...getStyles('section')} data-section="end">
            {end}
          </div>
        )}
      </Box>
    );
  },
);

Item.displayName = `@sixui/core/${COMPONENT_NAME}`;
Item.theme = itemTheme;
