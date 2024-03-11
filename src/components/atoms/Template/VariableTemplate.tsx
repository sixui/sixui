import { forwardRef, useMemo, useRef } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
  ITemplateVariant,
} from './Template.styledefs';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useForkRef } from '@/hooks/useForkRef';

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
>(function VariableTemplate(props, ref) {
  const {
    styles,
    sx,
    visualState: visualStateProp,
    variant = 'variant',
    children,
    ...other
  } = props;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp);
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

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
