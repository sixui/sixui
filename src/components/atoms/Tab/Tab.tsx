import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITabStyleKey,
  ITabStyleVarKey,
  ITabVariant,
} from './Tab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ITabProps extends IContainer<ITabStyleKey, ITabStyleVarKey> {
  variant?: ITabVariant;
}

type ITabVariantMap = {
  [key in ITabVariant]: keyof Pick<
    IThemeComponents,
    'PrimaryTab' | 'SecondaryTab'
  >;
};

const variantMap: ITabVariantMap = {
  primary: 'PrimaryTab',
  secondary: 'SecondaryTab',
};

export const Tab: React.FC<ITabProps> = ({ variant = 'primary', ...props }) => {
  const { theme, styles } = useComponentTheme('Tab');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
      ),
    [styles, variantStyles, props.styles],
  );

  return (
    <div {...styleProps(['host'], [theme, variantTheme, props.theme])}>Tab</div>
  );
};
