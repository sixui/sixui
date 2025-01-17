import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IItemThemeFactory } from './Item.css';
import type { IItemFactory } from './Item.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { itemTheme } from './Item.css';

const COMPONENT_NAME = 'Item';

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

Item.theme = itemTheme;
Item.displayName = `@sixui/${COMPONENT_NAME}`;
