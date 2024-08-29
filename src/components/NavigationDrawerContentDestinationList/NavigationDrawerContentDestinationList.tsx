import { forwardRef } from 'react';

import type { INavigationDrawerContentDestinationListProps } from './NavigationDrawerContentDestinationList.types';
import { useStyles } from '~/hooks/useStyles';
import { List } from '~/components/List';
import { Stack } from '~/components/Stack';
import { navigationDrawerContentDestinationListStyles } from './NavigationDrawerContentDestinationList.styles';
import { Divider } from '~/components/Divider';

export const NavigationDrawerContentDestinationList = forwardRef<
  HTMLDivElement,
  INavigationDrawerContentDestinationListProps
>(function NavigationDrawerContentDestinationList(props, forwardedRef) {
  const { styles, sx, innerStyles, headline, endDivider, children, ...other } =
    props;

  const { combineStyles, getStyles, globalStyles } = useStyles({
    componentName: 'NavigationDrawerContentDestinationList',
    styles: [navigationDrawerContentDestinationListStyles, styles],
  });

  return (
    <Stack
      {...other}
      gap={4}
      sx={[globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {headline ? <div {...getStyles('headline')}>{headline}</div> : null}
      <div>
        <List
          styles={innerStyles?.list}
          sx={[globalStyles, combineStyles('list'), sx]}
          ref={forwardedRef}
        >
          {children}
        </List>
        {endDivider ? <Divider sx={combineStyles('divider')} /> : null}
      </div>
    </Stack>
  );
});
