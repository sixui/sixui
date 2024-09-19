import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IDialogContentThemeFactory } from './DialogContent.css';
import type { IDialogContentFactory } from './DialogContent.types';
import { isFunction } from '~/helpers/isFunction';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Divider } from '../Divider';
import { Paper } from '../Paper';
import { dialogContentTheme } from './DialogContent.css';

const COMPONENT_NAME = 'DialogContent';

export const DialogContent = polymorphicComponentFactory<IDialogContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      type,
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
      theme: dialogContentTheme,
      variant,
      modifiers: {
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
        observer.observe(topAnchorRef.current);
      }

      const bottomAnchorEl = bottomAnchorRef.current;
      if (bottomAnchorEl) {
        observer.observe(bottomAnchorRef.current);
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

    const nodeRef = useRef<HTMLDivElement>(null);
    const handleRef = useMergeRefs([nodeRef, forwardedRef]);

    return (
      <Paper
        {...other}
        {...getStyles('root')}
        aria-labelledby={headline ? headlineId : undefined}
        aria-describedby={childrenId}
        role={type === 'alert' ? 'alertdialog' : undefined}
        ref={handleRef}
      >
        <div {...getStyles('dialog')}>
          <div {...getStyles('container')}>
            <div {...getStyles('header')}>
              {icon ? (
                <div {...getStyles('icon')}>
                  <div {...getStyles('iconSlot')}>{icon}</div>
                </div>
              ) : null}

              <h2
                {...getStyles('headline')}
                id={headlineId}
                aria-hidden={headline ? undefined : true}
              >
                <div {...getStyles('headlineSlot')}>{headline}</div>
              </h2>

              <Divider
                {...getStyles([
                  'divider',
                  'headlineDivider',
                  showTopDivider && 'headlineDivider$showTopDivider',
                ])}
              />
            </div>

            <div ref={scrollerRef} {...getStyles('scroller')}>
              <div {...getStyles('content')}>
                <div {...getStyles('contentSlot')} id={childrenId}>
                  <div ref={topAnchorRef} />
                  {children}
                  <div ref={bottomAnchorRef} />
                </div>
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
              {actions ? (
                <div {...getStyles('actions')}>
                  {isFunction(actions)
                    ? actions({ close: () => onClose?.() })
                    : actions}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Paper>
    );
  },
);

DialogContent.theme = dialogContentTheme;
DialogContent.displayName = `@sixui/${COMPONENT_NAME}`;
