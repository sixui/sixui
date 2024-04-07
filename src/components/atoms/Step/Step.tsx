import { forwardRef, useContext, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type { IStepStyleKey, IStepStyleVarKey } from './Step.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as ExclamationTriangleIcon } from '@/assets/ExclamationTriangle.svg';
import {
  StepperContext,
  type IStepperContext,
} from '@/components/atoms/Stepper/StepperContext';
import { ButtonBase, type IButtonBaseOwnProps } from '../ButtonBase';

export type IStepProps = IContainerProps<IStepStyleKey> &
  Partial<Pick<IStepperContext, 'labelPosition' | 'connector'>> & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'];
    active?: boolean;
    completed?: boolean;
    disabled?: boolean;
    index?: number;
    last?: boolean;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    supportingText?: React.ReactNode;
    hasError?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
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
      last: isLast,
      icon,
      label,
      supportingText,
      labelPosition: labelPositionProp,
      hasError,
      connector: connectorProp,
      children,
      onClick,
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
    const isCurrent = !disabled && !completed && index === context.activeStep;
    const isActive =
      !disabled && !completed && (activeProp ?? index <= context.activeStep);
    const isPreviousActive =
      !disabled && !completed && index < context.activeStep;
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
          : isActive
            ? 'active'
            : undefined;

    const renderInner = (): React.ReactElement => (
      <div
        {...sxf(
          'inner',
          hasText && 'inner$withText',
          `inner$${labelPosition}Label`,
        )}
      >
        <div
          {...sxf(
            'stepIndex',
            isIcon ? 'stepIndex$icon' : 'stepIndex$text',
            state &&
              (isIcon ? `stepIndex$icon$${state}` : `stepIndex$text$${state}`),
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
    );

    const renderConnector = (): React.ReactNode | undefined =>
      connector && typeof connector === 'function'
        ? connector({ active: isActive })
        : connector;

    return (
      <>
        {connector && !isFirst && labelPosition === 'right'
          ? renderConnector()
          : null}
        <div
          {...sxf('host', `host$${labelPosition}Label`, theme.vars, sx)}
          ref={ref}
          {...other}
        >
          {connector && !isFirst && labelPosition === 'bottom'
            ? renderConnector()
            : null}

          {onClick ? (
            <ButtonBase
              sx={stylesCombinator('button', `button$${labelPosition}Label`)}
              innerStyles={{
                ...innerStyles,
                focusRing: [
                  theme.focusRingStyles,
                  ...asArray(innerStyles?.focusRing),
                ],
              }}
              onClick={onClick}
              disabled={disabled}
            >
              {renderInner()}
            </ButtonBase>
          ) : (
            renderInner()
          )}

          {isCurrent && children ? (
            <div
              {...sxf(
                'content',
                isPreviousActive && 'content$active',
                isLast && 'content$last',
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      </>
    );
  },
);
Step.displayName = 'Step';
