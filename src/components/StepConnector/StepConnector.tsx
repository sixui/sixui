import { forwardRef, useContext } from 'react';

import type { IStepConnectorProps } from './StepConnector.types';
import { useStyles } from '~/hooks/useStyles';
import { StepContext } from '../Step';
import { Base } from '../Base';
import { stepConnectorStyles } from './StepConnector.styles';
import { stepConnectorTheme } from './StepConnector.stylex';

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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'StepConnector',
      styles: [stepConnectorStyles, styles],
    });

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
        {...getStyles(
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
        {...getStyles(
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
      <Base
        {...other}
        sx={[
          stepConnectorTheme,
          globalStyles,
          combineStyles(
            'host',
            `host$${orientation}$${stepLabelPosition}Label`,
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        <div
          {...getStyles(
            'container',
            `container$${orientation}`,
            orientation === 'horizontal' &&
              `container$horizontal$${textPosition}Text`,
          )}
        >
          {renderInner()}
        </div>
      </Base>
    );
  },
);
