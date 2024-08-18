import { Children, forwardRef } from 'react';

import type { IAppLayoutPanesProps } from './AppLayoutPanes.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellPanesStyles } from './AppLayoutPanes.styles';
import { Base } from '~/components/Base';

export const AppLayoutPanes = forwardRef<HTMLDivElement, IAppLayoutPanesProps>(
  function AppLayoutPanes(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutPanes',
      styles: [appShellPanesStyles, styles],
    });

    const filteredChildren = filterFalsyChildren(children);
    const panesCount = filteredChildren;

    return (
      <Base
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            panesCount === 1 ? 'host$singlePane' : 'host$multiPanes',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
