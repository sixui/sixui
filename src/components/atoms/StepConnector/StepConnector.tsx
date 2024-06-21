import { forwardRef, useContext, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IStepConnectorStyleKey,
  IStepConnectorStyleVarKey,
} from './StepConnector.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { StepContext } from '@/components/atoms/Step/StepContext';

export type IStepConnectorProps = IContainerProps<IStepConnectorStyleKey> & {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};

export const StepConnector = forwardRef<HTMLDivElement, IStepConnectorProps>(
  function StepConnector(props, forwardedRef) {
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

    const stepContext = useContext(StepContext);

    const orientation =
      orientationProp ?? stepContext?.orientation ?? 'horizontal';
    const stepLabelPosition =
      stepLabelPositionProp ?? stepContext?.labelPosition ?? 'right';
    const textPosition =
      (orientation === 'horizontal' ? textPositionProp : undefined) ?? 'middle';

    const renderLine = (props?: {
      cutStart?: boolean;
      cutEnd?: boolean;
    }): React.ReactElement => (
      <div
        {...sxf(
          'line',
          orientation === 'horizontal' && [
            'line$horizontal',
            props?.cutStart && `line$horizontal$cutStart`,
            props?.cutEnd && `line$horizontal$cutEnd`,
            stepLabelPosition === 'right' &&
              stepContext?.hasText &&
              'line$horizontal$rightLabel$hasText',
            !!children &&
              textPosition === 'middle' &&
              `line$horizontal$minLength`,
          ],
          orientation === 'vertical' && [
            'line$vertical',
            props?.cutStart && `line$vertical$cutStart`,
            props?.cutEnd && `line$vertical$cutEnd`,
            !!children &&
              textPosition === 'middle' &&
              `line$vertical$minLength`,
          ],
          stepContext?.completed && 'line$completed',
        )}
      />
    );

    const renderText = (): React.ReactElement => (
      <div
        {...sxf(
          'text',
          orientation === 'horizontal' && `text$horizontal`,
          orientation === 'vertical' && `text$vertical`,
          stepContext?.completed && 'text$completed',
        )}
      >
        {children}
      </div>
    );

    const renderInner = (): React.ReactElement =>
      children ? (
        textPosition === 'top' ? (
          <>
            {renderText()}
            {renderLine()}
          </>
        ) : textPosition === 'bottom' ? (
          <>
            {renderLine()}
            {renderText()}
          </>
        ) : (
          <>
            {renderLine({ cutEnd: true })}
            {renderText()}
            {renderLine({ cutStart: true })}
          </>
        )
      ) : (
        renderLine()
      );

    return (
      <div
        {...sxf(
          'host',
          `host$${orientation}$${stepLabelPosition}Label`,
          theme.vars,
          sx,
        )}
        ref={forwardedRef}
        {...other}
      >
        <div
          {...sxf(
            'container',
            `container$${orientation}`,
            orientation === 'horizontal' &&
              `container$horizontal$${textPosition}Text`,
          )}
        >
          {renderInner()}
        </div>
      </div>
    );
  },
);
