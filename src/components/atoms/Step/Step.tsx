import { forwardRef, useContext, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type { IStepStyleKey, IStepStyleVarKey } from './Step.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as ExclamationTriangleIcon } from '@/assets/ExclamationTriangle.svg';
import { ButtonBase, type IButtonBaseOwnProps } from '../ButtonBase';
import { StepperContext } from '@/components/atoms/Stepper/StepperContext';
import { Divider } from '@/components/atoms/Divider';

export type IStepProps = IContainerProps<IStepStyleKey> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'];
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index?: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  labelPosition?: 'right' | 'bottom';
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
      index = 0,
      last,
      icon,
      label,
      supportingText,
      labelPosition: labelPositionProp,
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

    const isIcon = !!icon || hasError;
    const hasText = !!label || !!supportingText;

    const context = useContext(StepperContext);
    const active =
      !disabled &&
      !completed &&
      (activeProp ?? (context && context.activeStep === index));
    const labelPosition =
      labelPositionProp ?? context?.labelPosition ?? 'right';

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : completed
          ? 'completed'
          : active
            ? 'active'
            : undefined;

    const layout =
      hasText && labelPosition === 'bottom' ? 'vertical' : 'horizontal';

    return (
      <>
        <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
          <ButtonBase
            sx={stylesCombinator('button', `button$${layout}`)}
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
                `buttonInner$${layout}`,
              )}
            >
              <div
                {...sxf(
                  'stepIndex',
                  isIcon ? 'stepIndex$icon' : 'stepIndex$text',
                  state &&
                    (isIcon
                      ? `stepIndex$icon$${state}`
                      : `stepIndex$text$${state}`),
                )}
              >
                {icon ??
                  (completed ? (
                    <CheckMarkIcon aria-hidden />
                  ) : hasError ? (
                    <ExclamationTriangleIcon aria-hidden />
                  ) : (
                    index + 1
                  ))}
              </div>
              {hasText ? (
                <div
                  {...sxf(
                    'labelContainer',
                    state && `labelContainer$${state}`,
                    `labelContainer$${layout}`,
                  )}
                >
                  <div {...sxf('label')}>{label}</div>
                  <div {...sxf('supportingText')}>{supportingText}</div>
                </div>
              ) : null}
            </div>
          </ButtonBase>
        </div>
        {last ? null : <Divider />}
      </>
    );
  },
);
Step.displayName = 'Step';
