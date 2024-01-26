import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
  ITemplateVariant,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ITemplateProps
  extends IContainer<ITemplateStyleKey, ITemplateStyleVarKey> {
  variant?: ITemplateVariant;
}

type ITemplateVariantMap = {
  [key in ITemplateVariant]: keyof Pick<IThemeComponents, 'VariantTemplate'>;
};

const variantMap: ITemplateVariantMap = {
  variant: 'VariantTemplate',
};

export const Template: React.FC<ITemplateProps> = ({
  variant = 'variant',
  ...props
}) => {
  const { theme, styles } = useComponentTheme('Template');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
      ),
    [styles, variantStyles, props.styles],
  );

  return (
    <div {...styleProps(['host'], [theme, variantTheme, props.theme])}>
      Template
    </div>
  );
};
