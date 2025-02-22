import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import type { IDialogContentThemeFactory } from './DialogContent.css';
import type { IDialogContentFactory } from './DialogContent.types';
import { Divider } from '~/components/Divider';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './DiagonalContent.constants';
import { dialogContentTheme } from './DialogContent.css';

/**
 * @see https://m3.material.io/components/dialogs/overview
 */
export const DialogContent = polymorphicComponentFactory<IDialogContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      type,
      size,
      scrollable,
      headline,
      icon,
      children,
      actions,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDialogContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dialogContentTheme,
      modifiers: {
        size,
        scrollable,
        'with-icon': !!icon,
        'with-headline': !!headline,
        'with-actions': !!actions,
      },
    });

    const headlineId = useId();
    const childrenId = useId();

    const [isAtScrollTop, setIsAtScrollTop] = useState(true);
    const [isAtScrollBottom, setIsAtScrollBottom] = useState(false);

    const showTopDivider = scrollable && !isAtScrollTop;
    const showBottomDivider = scrollable && !isAtScrollBottom;

    const scrollerRef = useRef<HTMLDivElement>(null);
    const topAnchorRef = useRef<HTMLDivElement>(null);
    const bottomAnchorRef = useRef<HTMLDivElement>(null);

    const handleAndhorIntersection = useCallback(
      (entry: IntersectionObserverEntry): void => {
        const { target, isIntersecting } = entry;
        if (target === topAnchorRef.current) {
          setIsAtScrollTop(isIntersecting);
        }

        if (target === bottomAnchorRef.current) {
          setIsAtScrollBottom(isIntersecting);
        }
      },
      [],
    );

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            handleAndhorIntersection(entry);
          }
        },
        { root: scrollerRef.current },
      );

      const topAnchorEl = topAnchorRef.current;
      if (topAnchorEl) {
        observer.observe(topAnchorEl);
      }

      const bottomAnchorEl = bottomAnchorRef.current;
      if (bottomAnchorEl) {
        observer.observe(bottomAnchorEl);
      }

      return () => {
        if (topAnchorEl) {
          observer.unobserve(topAnchorEl);
        }

        if (bottomAnchorEl) {
          observer.unobserve(bottomAnchorEl);
        }
      };
    }, [handleAndhorIntersection]);

    // TODO: Reset scroll position if re-opening a dialog with the same content.
    // See https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts#L193C8-L193C75

    return (
      <Paper
        {...getStyles('root')}
        aria-labelledby={headline ? headlineId : undefined}
        aria-describedby={childrenId}
        role={type === 'alert' ? 'alertdialog' : undefined}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('header')}>
          {icon && <div {...getStyles('icon')}>{icon}</div>}

          {headline && (
            <h2 {...getStyles('headline')} id={headlineId}>
              {headline}
            </h2>
          )}

          <Divider
            {...getStyles([
              'divider',
              'headlineDivider',
              showTopDivider && 'headlineDivider$showTopDivider',
            ])}
          />
        </div>

        <div ref={scrollerRef} {...getStyles('scroller')}>
          <div {...getStyles('content')} id={childrenId}>
            <div ref={topAnchorRef} />
            {children}
            <div ref={bottomAnchorRef} />
          </div>
        </div>

        <div {...getStyles('footer')}>
          <Divider
            {...getStyles([
              'divider',
              'actionsDivider',
              showBottomDivider && 'actionsDivider$showBottomDivider',
            ])}
          />

          {actions && (
            <div {...getStyles('actions')}>
              {isFunction(actions)
                ? actions({ close: (): IMaybeAsync<unknown> => onClose?.() })
                : actions}
            </div>
          )}
        </div>
      </Paper>
    );
  },
);

DialogContent.theme = dialogContentTheme;
DialogContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
