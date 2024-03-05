import { useId, useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IDialogStyleKey, IDialogStyleVarKey } from './Dialog.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Divider } from '../Divider';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export type IDialogProps = IContainerProps<IDialogStyleKey> & {
  open?: boolean;
  ariaLabel?: string;
  type?: 'alert';
  scrollable?: boolean;
  icon?: React.ReactNode;
  headline?: React.ReactNode;
  content?: React.ReactNode;
  actions?: React.ReactNode;
};

export const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    open,
    ariaLabel,
    type,
    scrollable,
    headline,
    icon,
    content,
    actions,
    ...other
  } = props;

  const theme = useComponentTheme('Dialog');
  const headlineId = useId();

  const styles = useMemo(
    () => stylesCombinatorFactory(theme.styles, other.styles),
    [theme.styles, other.styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<IDialogStyleKey, IDialogStyleVarKey>(
        styles,
        other.visualState,
      ),
    [styles, other.visualState],
  );

  // TODO: handle scrollable
  const isAtScrollTop = true;
  const isAtScrollBottom = false;

  const showTopDivider = scrollable && !isAtScrollTop;
  const showBottomDivider = scrollable && !isAtScrollBottom;

  return (
    <div
      {...styleProps(['host', other.sx], [theme.vars])}
      aria-label={ariaLabel}
      aria-labelledby={headline ? headlineId : undefined}
      role={type === 'alert' ? 'alertdialog' : undefined}
    >
      <div {...styleProps(['dialog', open && 'dialog$open'])}>
        <div {...styleProps(['container'])}>
          {headline || icon ? (
            <div {...styleProps(['headline'])}>
              <div {...styleProps(['icon'])}>
                <div {...styleProps(['iconSlot'])}>{icon}</div>
              </div>
              <h2
                {...styleProps(['header'])}
                id={headlineId}
                aria-hidden={headline ? undefined : true}
              >
                <div
                  {...styleProps([
                    'headlineSlot',
                    !!icon && 'headlineSlot$hasIcon',
                    scrollable && 'headlineSlot$scrollable',
                  ])}
                >
                  {headline}
                </div>
              </h2>
              <Divider
                sx={styles(
                  'divider',
                  'headlineDivider',
                  showTopDivider && 'headlineDivider$showTopDivider',
                )}
              />
            </div>
          ) : null}

          {content ? (
            <div
              {...styleProps(['scroller', scrollable && 'scroller$scrollable'])}
            >
              <div {...styleProps(['content'])}>
                <div
                  {...styleProps([
                    'contentSlot',
                    !!actions && 'contentSlot$hasActions',
                    scrollable &&
                      !!headline &&
                      'contentSlot$scrollable$hasHeadline',
                  ])}
                >
                  {content}
                </div>
              </div>
            </div>
          ) : null}

          {actions ? (
            <div {...styleProps(['actions'])}>
              <Divider
                sx={styles(
                  'divider',
                  'actionsDivider',
                  showBottomDivider && 'actionsDivide$showBottomDivider',
                )}
              />
              <div {...styleProps(['actionsSlot'])}>{actions}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
