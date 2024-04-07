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
  type IStepConnectorRenderProps,
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
      completed: completedProp,
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
    const completed =
      !disabled && (completedProp ?? (context && index <= context.activeStep));
    const isActive =
      !disabled && (activeProp ?? (context && index === context.activeStep));
    const labelPosition = hasText
      ? labelPositionProp ?? context?.labelPosition ?? 'right'
      : 'right';
    const isFirst = index <= 0;
    const connector =
      connectorProp !== undefined ? connectorProp : context?.connector;

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
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

    const renderConnector = (
      props: IStepConnectorRenderProps,
    ): React.ReactNode | undefined =>
      connector && typeof connector === 'function'
        ? connector(props)
        : connector;

    return (
      <>
        {connector && !isFirst && labelPosition === 'right'
          ? renderConnector({ completed })
          : null}
        <div
          {...sxf('host', `host$${labelPosition}Label`, theme.vars, sx)}
          ref={ref}
          {...other}
        >
          {connector && !isFirst && labelPosition === 'bottom'
            ? renderConnector({ completed })
            : null}

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

          {isActive && children ? (
            <div {...sxf('content')}>
              {isLast ? null : renderConnector({ completed: false })}
              <div {...sxf('contentText', isLast && 'contentText$last')}>
                {children}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  },
);
Step.displayName = 'Step';
