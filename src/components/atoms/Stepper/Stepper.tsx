import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IStepperStyleKey,
  IStepperStyleVarKey,
} from './Stepper.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Step } from '@/components/atoms/Step';

export type IStepperProps = IContainerProps<IStepperStyleKey> & {
  activeStep?: number;
  connector?: React.ReactNode;
  children?: React.ReactNode;
};

const Stepper = forwardRef<HTMLDivElement, IStepperProps>(
  function Stepper(props, ref) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentTheme('Template');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStepperStyleKey, IStepperStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        {children}
      </div>
    );
  },
);

const StepperNamespace = Object.assign(Stepper, {
  Step,
});

export { StepperNamespace as Stepper };
