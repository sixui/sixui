import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IIconStyleKey, IIconStyleVarKey } from './Icon.styledefs';
import type { IIcon } from '@/helpers/types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IIconProps
  extends IContainer<IIconStyleKey, IIconStyleVarKey> {
  icon: IIcon;
}

// https://github.com/material-components/material-web/blob/main/icon/internal/icon.ts
export const Icon: React.FC<IIconProps> = ({ icon: Icon, ...props }) => {
  const theme = useComponentTheme('Icon');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IIconStyleKey, IIconStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return (
    <div {...styleProps(['host'], [theme.vars, props.theme])}>
      <Icon {...styleProps(['svg'])} aria-hidden />
    </div>
  );
};
