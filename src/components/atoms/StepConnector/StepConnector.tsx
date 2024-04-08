import { forwardRef, useContext, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IStepConnectorStyleKey,
  IStepConnectorStyleVarKey,
} from './StepConnector.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { StepperContext } from '@/components/atoms/Stepper/StepperContext';
import { StepContext } from '@/components/atoms/Step/StepContext';

export type IStepConnectorProps = IContainerProps<IStepConnectorStyleKey> & {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};

export const StepConnector = forwardRef<HTMLDivElement, IStepConnectorProps>(
  function StepConnector(props, ref) {
    const {
      styles,
      sx,
      children,
      orientation: orientationProp,
      stepLabelPosition: stepLabelPositionProp,
      textPosition: textPositionProp,
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
    const stepLabelPosition =
      stepLabelPositionProp ?? stepperContext?.labelPosition ?? 'right';
    const textPosition =
      (orientation === 'horizontal' ? textPositionProp : undefined) ?? 'middle';

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
          `host$${stepLabelPosition}Label`,
          theme.vars,
          sx,
        )}
        ref={ref}
        {...other}
      >
        <>
          {renderLine()}
          {children ? (
            <>
              <div
                {...sxf(
                  'text',
                  `text$${orientation}`,
                  `text$${textPosition}`,
                  stepContext?.completed && 'text$completed',
                )}
              >
                {children}
              </div>
              {textPosition === 'middle' ? renderLine() : null}
            </>
          ) : null}
        </>
      </div>
    );
  },
);
