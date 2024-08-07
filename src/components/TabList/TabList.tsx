import { forwardRef } from 'react';

import type { ITabListProps } from './TabList.types';
import { useStyles } from '~/hooks/useStyles';
import { Divider } from '../Divider';
import { tabListStyles } from './TabList.styles';
import { Base } from '../Base';

export const TabList = forwardRef<HTMLInputElement, ITabListProps>(
  function TabList(props, forwardedRef) {
    const { styles, sx, children, fullWidth, ...other } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'TabList',
      styles: [tabListStyles, styles],
    });

    return (
      <Base
        role='tablist'
        aria-orientation='horizontal'
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        <div {...getStyles('tabList', fullWidth && 'tabList$fullWidth')}>
          {children}
        </div>
        <Divider />
      </Base>
    );
  },
);
