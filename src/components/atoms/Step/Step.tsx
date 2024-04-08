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
import { StepContext, type IStepContext } from './StepContext';

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
  hasError?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  labelPosition?: IStepperContext['labelPosition'];
  nextConnector?: IStepperContext['connector'];
};

export const Step = forwardRef<HTMLDivElement, IStepProps>(
  function Step(props, ref) {
    const {
      styles,
      sx,
      innerStyles,
      active: activeProp,
      completed: completedProp,
      disabled,
      index = 0,
      last: isLast,
      icon,
      label,
      supportingText,
      labelPosition: labelPositionProp,
      hasError,
      nextConnector: nextConnectorProp,
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
    const completed =
      !disabled &&
      (context?.completed ||
        (completedProp ??
          (context?.activeStep !== undefined && index < context.activeStep)));
    const isActive =
      !disabled && (activeProp ?? (context && index === context.activeStep));
    const labelPosition = hasText
      ? labelPositionProp ?? context?.labelPosition ?? 'right'
      : 'right';
    const nextConnector =
      nextConnectorProp !== undefined ? nextConnectorProp : context?.connector;
    const hasContent = isActive && !!children;

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : isActive
          ? 'active'
          : completed
            ? 'completed'
            : undefined;

    const renderInner = (): React.ReactElement => (
      <div {...sxf('inner', `inner$${labelPosition}Label`)}>
        <div
          {...sxf(
            'bulletPoint',
            isIcon ? 'bulletPoint$icon' : 'bulletPoint$text',
            state &&
              (isIcon
                ? `bulletPoint$icon$${state}`
                : `bulletPoint$text$${state}`),
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
            {...sxf('labelContainer', `labelContainer$${labelPosition}Label`)}
          >
            {label ? (
              <div {...sxf('label', state && `label$${state}`)}>{label}</div>
            ) : null}
            {supportingText ? (
              <div
                {...sxf('supportingText', state && `supportingText$${state}`)}
              >
                {supportingText}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );

    const contextValue: IStepContext = {
      completed,
      hasContent,
    };

    return (
      <StepContext.Provider value={contextValue}>
        <div
          {...sxf('host', `host$${labelPosition}Label`, theme.vars, sx)}
          ref={ref}
          {...other}
        >
          {onClick ? (
            <ButtonBase
              sx={stylesCombinator(
                `container$${labelPosition}Label`,
                'container',
              )}
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

          {hasContent ? (
            <StepContext.Provider value={{ completed: false }}>
              <div {...sxf('content')}>
                {nextConnector && !isLast ? (
                  <div {...sxf('contentConnectorContainer')}>
                    {nextConnector}
                  </div>
                ) : null}
                <div {...sxf('contentText')}>{children}</div>
              </div>
            </StepContext.Provider>
          ) : null}

          {nextConnector && !isLast && labelPosition === 'bottom'
            ? nextConnector
            : null}
        </div>
        {!isLast && labelPosition === 'right' ? nextConnector : null}
      </StepContext.Provider>
    );
  },
);
Step.displayName = 'Step';
