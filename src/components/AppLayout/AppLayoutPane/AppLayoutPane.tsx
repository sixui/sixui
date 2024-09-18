import { forwardRef } from 'react';

import type { IAppLayoutPaneProps } from './AppLayoutPane.types';
import { Base } from '~/components/Base';
import { useStyles } from '~/hooks/useStyles';
import { appLayoutPaneStyles } from './AppLayoutPane.styles';

export const AppLayoutPane = forwardRef<HTMLDivElement, IAppLayoutPaneProps>(
  function AppLayoutPane(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      componentName: 'AppLayoutPane',
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
