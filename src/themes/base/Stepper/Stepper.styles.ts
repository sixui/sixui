import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepperStyleKey } from '@/components/atoms/Stepper';
import { componentVars as vars } from './Stepper.stylex';

type IStepperStyles = IStyles<IStepperStyleKey>;
export const styles: MapNamespaces<IStepperStyles> =
  stylex.create<IStepperStyles>({
    host: {
      //
    },
  });
