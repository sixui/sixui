import { forwardRef } from 'react';

import type { IAppLayoutFooterProps } from './AppLayoutFooter.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutFooterStyles } from './AppLayoutFooter.styles';

export const AppLayoutFooter = forwardRef<HTMLDivElement, IAppLayoutFooterProps>(
  function AppLayoutFooter(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutFooter',
      styles: [appLayoutFooterStyles, styles],
    });

    return (
      <Base
        as='footer'
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
