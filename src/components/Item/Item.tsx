import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IItemFactory } from './Item.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { itemTheme, type IItemThemeFactory } from './Item.css';

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
      theme: itemTheme,
      variant,
      modifiers: {
        'line-clamp': lineClamp,
      },
    });

    return (
      <Paper
        {...other}
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
      >
        {start && (
          <div {...getStyles('section')} data-section='start'>
            {start}
          </div>
        )}

        <div {...getStyles('section')} data-section='main'>
          <div
            {...getStyles('main', {
              style: lineClamp
                ? assignInlineVars({
                    [itemTheme.tokens.lineClamp]: String(lineClamp),
                  })
                : undefined,
            })}
          >
            {overline ? (
              <div {...getStyles('overlineText')}>{overline}</div>
            ) : null}
            <div {...getStyles('headlineText')}>{children}</div>
            {supportingText ? (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            ) : null}
          </div>
        </div>

        {trailingSupportingText ? (
          <div {...getStyles('section')} data-section='trailingSupportingText'>
            {trailingSupportingText}
          </div>
        ) : null}

        {end ? (
          <div {...getStyles('section')} data-section='end'>
            {end}
          </div>
        ) : null}
      </Paper>
    );
  },
);

Item.theme = itemTheme;
Item.displayName = `@sixui/${COMPONENT_NAME}`;
