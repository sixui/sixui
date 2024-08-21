import { forwardRef } from 'react';

import type { IAppLayoutPaneProps } from './AppLayoutPane.types';
import { useStyles } from '~/hooks/useStyles';
import { appLayoutPaneStyles } from './AppLayoutPane.styles';
import { Base } from '~/components/Base';

export const AppLayoutPane = forwardRef<HTMLDivElement, IAppLayoutPaneProps>(
  function AppLayoutPane(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutPane',
      styles: [appLayoutPaneStyles, styles],
    });

    return (
      <Base
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
