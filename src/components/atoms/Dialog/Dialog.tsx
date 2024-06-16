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
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IDialogStyleKey, IDialogStyleVarKey } from './Dialog.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '@/components/atoms/Divider';
import { Scrim } from '@/components/atoms/Scrim';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

const DEFAULT_TAG = 'div';

type IOnCloseEventHandler = (event: React.MouseEvent, reason?: string) => void;

export type IDialogOwnProps = IContainerProps<IDialogStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    open?: boolean;
    type?: 'alert';
    scrollable?: boolean;
    icon?: React.ReactNode;
    headline?: React.ReactNode;
    children?: React.ReactNode;
    actions?:
      | React.ReactNode
      | ((close?: IOnCloseEventHandler) => React.ReactNode);
    onClose?: IOnCloseEventHandler;
  };

export type IDialogProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IDialogOwnProps>;

type IDialog = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IDialogProps<TRoot>,
) => React.ReactNode;

export const Dialog: IDialog = forwardRef(function Dialog<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IDialogProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = DEFAULT_TAG,
    styles,
    sx,
    open,
    type,
    scrollable,
    headline,
    icon,
    children,
    actions,
    onClose,
    ...other
  } = props as IWithAsProp<IDialogOwnProps>;

  const { theme } = useComponentTheme('Dialog');
  const headlineId = useId();

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IDialogStyleKey, IDialogStyleVarKey>(stylesCombinator),
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

  const backdropClick = useRef(false);
  const handleMouseDown = (event: React.MouseEvent): void => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  const handleScrimClick = (event: React.MouseEvent): void => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = false;
    onClose?.(event, 'backdropClick');
  };

  const renderActions = (): React.ReactNode =>
    typeof actions === 'function' ? actions(onClose) : actions;

  // TODO: Reset scroll position if re-opening a dialog with the same content.
  // See https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts#L193C8-L193C75

  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(nodeRef, ref);

  return (
    <Scrim open={open} onClick={handleScrimClick} onMouseDown={handleMouseDown}>
      <Component
        {...sxf('host', theme.vars, sx)}
        sx={sx}
        // ref={handleRef}
        aria-labelledby={headline ? headlineId : undefined}
        role={type === 'alert' ? 'alertdialog' : undefined}
        {...other}
      >
        <div {...sxf('dialog')} ref={handleRef}>
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

            {children ? (
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
                    {children}
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
                <div {...sxf('actionsSlot')}>{renderActions()}</div>
              </div>
            ) : null}
          </div>
        </div>
      </Component>
    </Scrim>
  );
});
