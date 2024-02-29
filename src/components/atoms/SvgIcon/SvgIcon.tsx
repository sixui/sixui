import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  ISvgIconStyleKey,
  ISvgIconStyleVarKey,
} from './SvgIcon.styledefs';
import type { ISvgIcon } from '@/helpers/types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/icon/internal/icon.ts

export interface ISvgIconProps
  extends IContainer<ISvgIconStyleKey, ISvgIconStyleVarKey> {
  icon: ISvgIcon;
}

export const SvgIcon: React.FC<ISvgIconProps> = ({ icon: Icon, ...props }) => {
  const theme = useComponentTheme('SvgIcon');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ISvgIconStyleKey, ISvgIconStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return (
    <div {...styleProps(['host', props.sx], [theme.vars, props.theme])}>
      <Icon {...styleProps(['svg'])} aria-hidden />
    </div>
  );
};
