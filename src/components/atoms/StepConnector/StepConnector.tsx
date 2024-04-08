import { forwardRef, useContext, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IStepConnectorStyleKey,
  IStepConnectorStyleVarKey,
} from './StepConnector.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { StepperContext } from '@/components/atoms/Stepper';
import { StepContext } from '@/components/atoms/Step';

export type IStepConnectorProps = IContainerProps<IStepConnectorStyleKey> & {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'right' | 'bottom';
};

export const StepConnector = forwardRef<HTMLDivElement, IStepConnectorProps>(
  function StepConnector(props, ref) {
    const {
      styles,
      sx,
      children,
      orientation: orientationProp,
      labelPosition: labelPositionProp,
      ...other
    } = props;

    const { theme } = useComponentTheme('StepConnector');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStepConnectorStyleKey, IStepConnectorStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const stepperContext = useContext(StepperContext);
    const stepContext = useContext(StepContext);

    const orientation =
      orientationProp ?? stepperContext?.orientation ?? 'horizontal';
    const labelPosition =
      labelPositionProp ?? stepperContext?.labelPosition ?? 'right';

    const renderLine = (): React.ReactElement => (
      <div
        {...sxf(
          'line',
          `line$${orientation}`,
          stepContext?.hasContent && `line$hasContent$${orientation}`,
          stepContext?.completed && 'line$completed',
        )}
      />
    );

    return (
      <div
        {...sxf(
          'host',
          `host$${orientation}`,
          `host$${labelPosition}Label`,
          theme.vars,
          sx,
        )}
        ref={ref}
        {...other}
      >
        {children ? (
          <>
            {renderLine()}
            <div
              {...sxf(
                'text',
                `text$${orientation}`,
                stepContext?.completed && 'text$completed',
              )}
            >
              {children}
            </div>
            {renderLine()}
          </>
        ) : (
          renderLine()
        )}
      </div>
    );
  },
);
