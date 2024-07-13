import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isFunction } from 'lodash';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IDialogContentStyleKey,
  IDialogContentStyleVarKey,
} from './DialogContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { Divider } from '@/components/atoms/Divider';
import {
  DIALOG_CONTENT_DEFAULT_TAG,
  type IDialogContentOwnProps,
  type IDialogContentProps,
} from './DialogContentProps';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

type IDialogContent = <
  TRoot extends React.ElementType = typeof DIALOG_CONTENT_DEFAULT_TAG,
>(
  props: IDialogContentProps<TRoot>,
) => React.ReactNode;

export const DialogContent: IDialogContent = forwardRef(function DialogContent<
  TRoot extends React.ElementType = typeof DIALOG_CONTENT_DEFAULT_TAG,
>(props: IDialogContentProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = DIALOG_CONTENT_DEFAULT_TAG,
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
  } = props as IWithAsProp<IDialogContentOwnProps>;

  const headlineId = useId();
  const childrenId = useId();

  const { theme } = useComponentThemeOld('DialogContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IDialogContentStyleKey, IDialogContentStyleVarKey>(
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

  const renderActions = (): React.ReactNode =>
    isFunction(actions)
      ? actions({ close: (event) => onClose?.(event) })
      : actions;

  // TODO: Reset scroll position if re-opening a dialog with the same content.
  // See https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts#L193C8-L193C75

  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useMergeRefs([nodeRef, forwardedRef]);

  return (
    <Component
      {...sxf('host', theme.vars, sx)}
      sx={sx}
      aria-labelledby={headline ? headlineId : undefined}
      aria-describedby={childrenId}
      role={type === 'alert' ? 'alertdialog' : undefined}
      {...other}
      ref={handleRef}
    >
      <div {...sxf('dialog')}>
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

          <div
            ref={scrollerRef}
            {...sxf('scroller', scrollable && 'scroller$scrollable')}
          >
            <div {...sxf('content')}>
              <div
                {...sxf(
                  'contentSlot',
                  scrollable && 'contentSlot$scrollable',
                  !!actions && 'contentSlot$hasActions',
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
        </div>
      </div>
    </Component>
  );
});
