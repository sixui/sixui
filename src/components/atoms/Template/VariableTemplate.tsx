import { forwardRef, useMemo } from 'react';

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

export type IVariableTemplateProps = IContainerProps<
  ITemplateStyleKey,
  ITemplateStyleVarKey
> & {
  variant?: ITemplateVariant;
  children?: React.ReactNode;
};

type ITemplateVariantMap = {
  [key in ITemplateVariant]: keyof Pick<IThemeComponents, 'VariantTemplate'>;
};

const variantMap: ITemplateVariantMap = {
  variant: 'VariantTemplate',
};

export const VariableTemplate = forwardRef<
  HTMLDivElement,
  IVariableTemplateProps
>(function VariableTemplate(props, ref) {
  const { variant = 'variant', children, ...other } = props;

  const theme = useComponentTheme('Template');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const styles = useMemo(
    () =>
      stylesCombinatorFactory(theme.styles, variantTheme.styles, other.styles),
    [theme.styles, variantTheme.styles, other.styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        styles,
        other.visualState,
      ),
    [styles, other.visualState],
  );

  return (
    <div
      {...styleProps(
        ['host', other.sx],
        [theme.vars, variantTheme.vars, other.theme],
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});
