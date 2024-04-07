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

export type IStepConnectorProps = IContainerProps<IStepConnectorStyleKey> & {
  children?: React.ReactNode;
};

export const StepConnector = forwardRef<HTMLDivElement, IStepConnectorProps>(
  function StepConnector(props, ref) {
    const { styles, sx, children, ...other } = props;

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

    const context = useContext(StepperContext);

    const renderLine = (): React.ReactElement => (
      <div {...sxf('line', `line$${context.orientation}`)} />
    );

    return (
      <div
        {...sxf(
          'host',
          `host$${context.orientation}`,
          `host$${context.labelPosition}Label`,
          theme.vars,
          sx,
        )}
        ref={ref}
        {...other}
      >
        {children ? (
          <>
            {renderLine()}
            <div {...sxf('text')}>{children}</div>
            {renderLine()}
          </>
        ) : (
          renderLine()
        )}
      </div>
    );
  },
);
