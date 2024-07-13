import { forwardRef, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  IVariableTemplateStyleKey,
  IVariableTemplateStyleVarKey,
  IVariableTemplateVariant,
} from './VariableTemplate.styledefs';
import type { IVariableTemplateProps } from './VariableTemplateProps';
import { useVisualState } from '@/components/utils/VisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';

type ITemplateVariantMap = {
  [key in IVariableTemplateVariant]: keyof Pick<
    IThemeComponents,
    'VariantTemplate'
  >;
};

const variantMap: ITemplateVariantMap = {
  variant: 'VariantTemplate',
};

export const VariableTemplate = forwardRef<
  HTMLDivElement,
  IVariableTemplateProps
>(function VariableTemplate(props, forwardedRef) {
  const {
    styles,
    sx,
    visualState: visualStateProp,
    variant = 'variant',
    children,
    ...other
  } = props;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } =
    useVisualState(visualStateProp);
  const handleRef = useMergeRefs([forwardedRef, actionRef, setVisualStateRef]);

  const { theme, variantTheme } = useComponentThemeOld(
    'Template',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IVariableTemplateStyleKey,
        IVariableTemplateStyleVarKey
      >(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  return (
    <div
      {...sxf('host', theme.vars, variantTheme?.vars, sx)}
      {...other}
      ref={handleRef}
    >
      {children}
    </div>
  );
});
