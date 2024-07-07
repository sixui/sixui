import { forwardRef, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
  ITemplateVariant,
} from './Template.styledefs';
import {
  type IVisualState,
  useVisualState,
} from '@/components/utils/VisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IVariableTemplateProps = IContainerProps<ITemplateStyleKey> & {
  visualState?: IVisualState;
  variant?: ITemplateVariant | false;
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

  const { theme, variantTheme } = useComponentTheme(
    'Template',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  return (
    <div
      {...sxf('host', theme.vars, variantTheme?.vars, sx)}
      ref={handleRef}
      {...other}
    >
      {children}
    </div>
  );
});
