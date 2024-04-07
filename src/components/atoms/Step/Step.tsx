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
  connector?: React.ReactNode;
  children?: React.ReactNode;
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
      connector: connectorProp,
      children,
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
    const labelPosition = hasText
      ? labelPositionProp ?? context.labelPosition
      : 'right';
    const isFirst = index <= 0;
    const connector =
      connectorProp !== undefined ? connectorProp : context.connector;

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : completed
          ? 'completed'
          : active
            ? 'active'
            : undefined;

    return (
      <>
        {connector && !isFirst && labelPosition === 'right' ? connector : null}
        <div
          {...sxf('host', `host$${labelPosition}Label`, theme.vars, sx)}
          ref={ref}
          {...other}
        >
          {connector && !isFirst && labelPosition === 'bottom'
            ? connector
            : null}
          <ButtonBase
            sx={stylesCombinator('button', `button$${labelPosition}Label`)}
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
                `buttonInner$${labelPosition}Label`,
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
                    `labelContainer$${labelPosition}Label`,
                  )}
                >
                  {label ? <div {...sxf('label')}>{label}</div> : null}
                  {supportingText ? (
                    <div {...sxf('supportingText')}>{supportingText}</div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </ButtonBase>
          {children ? <div {...sxf('content')}>{children}</div> : null}
        </div>
      </>
    );
  },
);
Step.displayName = 'Step';
