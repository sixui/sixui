import { forwardRef, useId, useMemo } from 'react';

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

    // TODO: handle scrollable
    const isAtScrollTop = true;
    const isAtScrollBottom = false;

    const showTopDivider = scrollable && !isAtScrollTop;
    const showBottomDivider = scrollable && !isAtScrollBottom;

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
                <div {...sxf('icon')}>
                  <div {...sxf('iconSlot')}>{icon}</div>
                </div>
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
              <div {...sxf('scroller', scrollable && 'scroller$scrollable')}>
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