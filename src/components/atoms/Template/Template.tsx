import * as React from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
  ITemplateVariant,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ITemplateProps = IContainerProps<
  ITemplateStyleKey,
  ITemplateStyleVarKey
> & {
  variant?: ITemplateVariant;
};

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
  const theme = useComponentTheme('Template');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        props.visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, props.visualState],
  );

  return (
    <div
      {...styleProps(
        ['host', props.sx],
        [theme.vars, variantTheme.vars, props.theme],
      )}
    >
      Template
    </div>
  );
};
