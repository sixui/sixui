import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type { IStepStyleKey, IStepStyleVarKey } from './Step.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as ExclamationTriangleIcon } from '@/assets/ExclamationTriangle.svg';
import { ButtonBase, type IButtonBaseOwnProps } from '../ButtonBase';

export type IStepProps = IContainerProps<IStepStyleKey> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'];
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  hasError?: boolean;
};

export const Step = forwardRef<HTMLDivElement, IStepProps>(
  function Step(props, ref) {
    const {
      styles,
      sx,
      innerStyles,
      active: activeProp,
      completed,
      disabled,
      index,
      last,
      icon,
      label,
      supportingText,
      layout = 'horizontal',
      hasError,
      ...other
    } = props;

    const { theme } = useComponentTheme('Step');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStepStyleKey, IStepStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    const isIcon = icon || hasError;
    const hasText = !!label || !!supportingText;
    const isVertical = hasText && layout === 'vertical';
    const active = !disabled && !completed && activeProp;

    return (
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        <ButtonBase
          sx={stylesCombinator(
            'button',
            isVertical ? 'button$vertical' : 'button$horizontal',
          )}
          innerStyles={{
            ...innerStyles,
            focusRing: [
              theme.focusRingStyles,
              ...asArray(innerStyles?.focusRing),
            ],
          }}
          disabled={disabled}
        >
          <div
            {...sxf(
              'buttonInner',
              hasText && 'buttonInner$withText',
              isVertical ? `buttonInner$vertical` : `buttonInner$horizontal`,
              isIcon && 'buttonInner$hasIcon',
            )}
          >
            <div
              {...sxf(
                'stepIndex',
                isIcon ? 'stepIndex$icon' : 'stepIndex$text',
                disabled
                  ? isIcon
                    ? 'stepIndex$icon$disabled'
                    : 'stepIndex$text$disabled'
                  : hasError &&
                      (isIcon
                        ? 'stepIndex$icon$error'
                        : 'stepIndex$text$error'),
                active &&
                  (isIcon ? 'stepIndex$icon$active' : 'stepIndex$text$active'),
                completed &&
                  (isIcon
                    ? 'stepIndex$icon$completed'
                    : 'stepIndex$text$completed'),
              )}
            >
              {icon ??
                (completed ? (
                  <CheckMarkIcon aria-hidden />
                ) : hasError ? (
                  <ExclamationTriangleIcon aria-hidden />
                ) : (
                  index
                ))}
            </div>
            {hasText ? (
              <div
                {...sxf(
                  'labelContainer',
                  disabled
                    ? 'labelContainer$disabled'
                    : hasError && 'labelContainer$error',
                  active && 'labelContainer$active',
                  completed && 'labelContainer$completed',
                  isVertical
                    ? `labelContainer$vertical`
                    : `labelContainer$horizontal`,
                )}
              >
                <div {...sxf('label')}>{label}</div>
                <div {...sxf('supportingText')}>{supportingText}</div>
              </div>
            ) : null}
          </div>
        </ButtonBase>
      </div>
    );
  },
);
