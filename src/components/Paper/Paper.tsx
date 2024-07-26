import { forwardRef, useMemo } from 'react';

import type { IPaperProps } from './Paper.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { PaperBase } from '~/components/PaperBase';
import { paperStyles } from './Paper.styles';

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts

export const Paper = forwardRef<HTMLDivElement, IPaperProps>(
  function Paper(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      children,
      elevation: elevationProp,
      corner,
      surface: surfaceProp,
      outlined,
      ...other
    } = props;

    const componentTheme = useComponentTheme('Paper');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(paperStyles, styles),
      [styles],
    );

    const elevation = outlined ? 0 : (elevationProp ?? 0);
    const surface = outlined ? 'none' : surfaceProp;

    return (
      <PaperBase
        sx={[
          componentTheme.overridenStyles,
          stylesCombinator('host'),
          stylesCombinator(`elevation$${elevation ?? '0'}`),
          stylesCombinator(`corner$${corner ?? 'none'}`),
          stylesCombinator(`surface$${surface ?? 'none'}`),
          outlined && stylesCombinator('host$outlined'),
          sx,
        ]}
        styles={innerStyles?.paperBase}
        ref={forwardedRef}
        {...other}
      >
        {children}
      </PaperBase>
    );
  },
);
