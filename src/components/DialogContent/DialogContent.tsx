import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Divider } from '~/components/Divider';
import {
  DIALOG_CONTENT_DEFAULT_TAG,
  type IDialogContentOwnProps,
  type IDialogContentProps,
} from './DialogContent.types';
import { dialogContentStyles } from './DialogContent.styles';
import { dialogContentTheme } from './DialogContent.stylex';

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

  const componentTheme = useComponentTheme('DialogContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(dialogContentStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
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

  // TODO: Reset scroll position if re-opening a dialog with the same content.
  // See https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts#L193C8-L193C75

  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useMergeRefs([nodeRef, forwardedRef]);

  return (
    <Component
      {...sxf(dialogContentTheme, componentTheme.overridenStyles, 'host', sx)}
      sx={sx}
      aria-labelledby={headline ? headlineId : undefined}
      aria-describedby={childrenId}
      role={type === 'alert' ? 'alertdialog' : undefined}
      {...other}
      ref={handleRef}
    >
      <div {...sxf('dialog')}>
        <div {...sxf('container')}>
          <div {...sxf('header')}>
            {icon ? (
              <div {...sxf('icon')}>
                <div {...sxf('iconSlot')}>{icon}</div>
              </div>
            ) : null}

            <h2
              {...sxf('headline')}
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

            <Divider
              sx={stylesCombinator(
                'divider',
                'headlineDivider',
                showTopDivider && 'headlineDivider$showTopDivider',
              )}
            />
          </div>

          <div
            ref={scrollerRef}
            {...sxf('scroller', scrollable && 'scroller$scrollable')}
          >
            <div {...sxf('content')}>
              <div
                {...sxf(
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

          <div {...sxf('footer', !!actions && 'footer$hasActions')}>
            <Divider
              sx={stylesCombinator(
                'divider',
                'actionsDivider',
                showBottomDivider && 'actionsDivide$showBottomDivider',
              )}
            />
            {actions ? (
              <div {...sxf('actions')}>
                {isFunction(actions)
                  ? actions({ close: (event) => onClose?.(event) })
                  : actions}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Component>
  );
});
