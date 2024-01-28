import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ITabsStyleKey, ITabsStyleVarKey } from './Tabs.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ITabsProps
  extends IContainer<ITabsStyleKey, ITabsStyleVarKey> {
  // TODO:
}

export const Tabs: React.FC<ITabsProps> = ({ ...props }) => {
  const { theme, styles } = useComponentTheme('Tabs');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabsStyleKey, ITabsStyleVarKey>(
        stylesCombinatorFactory(styles, props.styles),
      ),
    [styles, props.styles],
  );

  return <div {...styleProps(['host'], [theme, props.theme])}>Tabs</div>;
};
