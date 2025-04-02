import type { ITopAppBarThemeFactory } from './TopAppBar.css';
import type { ITopAppBarFactory } from './TopAppBar.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './TopAppBar.constants';
import { topAppBarTheme, topAppBarThemeVariants } from './TopAppBar.css';

/**
 * @see https://m3.material.io/components/top-app-bar/overview
 */
export const TopAppBar = polymorphicComponentFactory<ITopAppBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      headline,
      leadingNavigation,
      trailingActions,
      scrolling,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ITopAppBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: topAppBarTheme,
      themeVariants: topAppBarThemeVariants,
    });

    const consolidated = variant === 'centerAligned';
    const hasMultilineHeadline = variant === 'medium' || variant === 'large';

    return (
      <Paper
        {...getStyles('root', {
          modifiers: {
            scrolling,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('mainSection')}>
          <div {...getStyles('leadingNavigationSlot')}>{leadingNavigation}</div>
          <div {...getStyles(['headlineSlot', 'headlineText'])}>
            {!hasMultilineHeadline && headline}
          </div>
          <div {...getStyles('trailingActionsSlot')}>
            {isFunction(trailingActions)
              ? trailingActions({ consolidated })
              : trailingActions}
          </div>
        </div>
        {hasMultilineHeadline && headline && (
          <div {...getStyles(['headlineSection', 'headlineText'])}>
            {headline}
          </div>
        )}
      </Paper>
    );
  },
);

TopAppBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
TopAppBar.theme = topAppBarTheme;
