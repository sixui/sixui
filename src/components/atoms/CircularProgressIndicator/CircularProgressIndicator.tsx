import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IMakeOptional } from '@/helpers/types';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorStyleKey } from './DeterminateCircularProgressIndicator.styledefs';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorStyleKey } from './IndeterminateCircularProgressIndicator.styledefs';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';
import {
  ICircularProgressIndicatorStyleKey,
  ICircularProgressIndicatorStyleVarKey,
} from './CircularProgressIndicator.styledefs';

export interface ICircularProgressIndicatorProps
  extends IContainer<
      | ICircularProgressIndicatorStyleKey
      | IDeterminateCircularProgressIndicatorStyleKey
      | IIndeterminateCircularProgressIndicatorStyleKey,
      ICircularProgressIndicatorStyleVarKey
    >,
    IMakeOptional<
      Omit<IDeterminateCircularProgressIndicatorProps, 'styles'>,
      'value'
    >,
    Omit<IIndeterminateCircularProgressIndicatorProps, 'styles'> {}

export const CircularProgressIndicator: React.FC<
  ICircularProgressIndicatorProps
> = ({ value, ...props }) =>
  value === undefined ? (
    <IndeterminateCircularProgressIndicator {...props} />
  ) : (
    <DeterminateCircularProgressIndicator {...props} value={value} />
  );
