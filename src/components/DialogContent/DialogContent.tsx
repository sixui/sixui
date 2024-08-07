import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IDialogContentProps } from './DialogContent.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useStyles } from '~/hooks/useStyles';
import { Divider } from '../Divider';
import { Base } from '../Base';
import { dialogContentStyles } from './DialogContent.styles';
import { dialogContentTheme } from './DialogContent.stylex';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export const DialogContent = createPolymorphicComponent<
  'div',
  IDialogContentProps
>(
  forwardRef<HTMLDivElement, IDialogContentProps>(
    function DialogContent(props, forwardedRef) {
      const {
        styles,
        sx,
        type,
        scrollable,
        headline,
        icon,
        children,
        actions,
        onClose,
        ...other
      } = props;

      const headlineId = useId();
      const childrenId = useId();

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'DialogContent',
        styles: [dialogContentStyles, styles],
      });

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
        <Base
          aria-labelledby={headline ? headlineId : undefined}
          aria-describedby={childrenId}
          role={type === 'alert' ? 'alertdialog' : undefined}
          {...other}
          sx={[dialogContentTheme, globalStyles, combineStyles('host'), sx]}
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
                  <div
                    {...getStyles(
                      'headlineSlot',
                      !!icon && 'headlineSlot$hasIcon',
                      scrollable && 'headlineSlot$scrollable',
                    )}
                  >
                    {headline}
                  </div>
                </h2>

                <Divider
                  sx={combineStyles(
                    'divider',
                    'headlineDivider',
                    showTopDivider && 'headlineDivider$showTopDivider',
                  )}
                />
              </div>

              <div
                ref={scrollerRef}
                {...getStyles('scroller', scrollable && 'scroller$scrollable')}
              >
                <div {...getStyles('content')}>
                  <div
                    {...getStyles(
                      'contentSlot',
                      scrollable && 'contentSlot$scrollable',
                      !!headline && 'contentSlot$hasHeadline',
                      scrollable &&
                        !!headline &&
                        'contentSlot$scrollable$hasHeadline',
                    )}
                    id={childrenId}
                  >
                    <div ref={topAnchorRef} />
                    {children}
                    <div ref={bottomAnchorRef} />
                  </div>
                </div>
              </div>

              <div {...getStyles('footer', !!actions && 'footer$hasActions')}>
                <Divider
                  sx={combineStyles(
                    'divider',
                    'actionsDivider',
                    showBottomDivider && 'actionsDivide$showBottomDivider',
                  )}
                />
                {actions ? (
                  <div {...getStyles('actions')}>
                    {isFunction(actions)
                      ? actions({ close: (event) => onClose?.(event) })
                      : actions}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Base>
      );
    },
  ),
);
