import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepperStyleKey } from '@/components/atoms/Stepper';

type IStepperStyles = IStyles<IStepperStyleKey>;
export const styles: MapNamespaces<IStepperStyles> =
  stylex.create<IStepperStyles>({
    host: {
      display: 'flex',
      flexGrow: 1,
    },
    host$horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    host$vertical: {
      flexDirection: 'column',
    },
    host$labelBottom: {
      alignItems: 'flex-start',
    },
  });
