import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IDialogStyleKey, IDialogStyleVarKey } from './Dialog.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export type IDialogProps = IContainerProps<IDialogStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    open?: boolean;
    type?: 'alert';
    scrollable?: boolean;
    icon?: React.ReactNode;
    headline?: React.ReactNode;
    content?: React.ReactNode;
    actions?: React.ReactNode;
  };

export const Dialog = forwardRef<HTMLDivElement, IDialogProps>(
  function Dialog(props, ref) {
    const {
      styles,
      sx,
      open,
      type,
      scrollable,
      headline,
      icon,
      content,
      actions,
      ...other
    } = props;

    const { theme } = useComponentTheme('Dialog');
    const headlineId = useId();

    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IDialogStyleKey, IDialogStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

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

    return (
      <div
        {...sxf('host', theme.vars, sx)}
        aria-labelledby={headline ? headlineId : undefined}
        role={type === 'alert' ? 'alertdialog' : undefined}
        ref={ref}
        {...other}
      >
        <div {...sxf('dialog', open && 'dialog$open')}>
          <div {...sxf('container')}>
            {headline || icon ? (
              <div {...sxf('headline')}>
                {icon ? (
                  <div {...sxf('icon')}>
                    <div {...sxf('iconSlot')}>{icon}</div>
                  </div>
                ) : null}

                {headline ? (
                  <h2
                    {...sxf('header')}
                    id={headlineId}
                    aria-hidden={headline ? undefined : true}
                  >
                    <div
                      {...sxf(
                        'headlineSlot',
                        !!icon && 'headlineSlot$hasIcon',
                        scrollable && 'headlineSlot$scrollable',
                      )}
                    >
                      {headline}
                    </div>
                  </h2>
                ) : null}

                <Divider
                  sx={stylesCombinator(
                    'divider',
                    'headlineDivider',
                    showTopDivider && 'headlineDivider$showTopDivider',
                  )}
                />
              </div>
            ) : null}

            {content ? (
              <div
                ref={scrollerRef}
                {...sxf('scroller', scrollable && 'scroller$scrollable')}
              >
                <div ref={topAnchorRef} />
                <div {...sxf('content')}>
                  <div
                    {...sxf(
                      'contentSlot',
                      !!actions && 'contentSlot$hasActions',
                      scrollable &&
                        !!headline &&
                        'contentSlot$scrollable$hasHeadline',
                    )}
                  >
                    {content}
                  </div>
                </div>
                <div ref={bottomAnchorRef} />
              </div>
            ) : null}

            {actions ? (
              <div {...sxf('actions')}>
                <Divider
                  sx={stylesCombinator(
                    'divider',
                    'actionsDivider',
                    showBottomDivider && 'actionsDivide$showBottomDivider',
                  )}
                />
                <div {...sxf('actionsSlot')}>{actions}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);
