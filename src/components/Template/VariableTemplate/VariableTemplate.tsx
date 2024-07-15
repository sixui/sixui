import { forwardRef, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IVariableTemplateProps } from './VariableTemplate.types';
import { useVisualState } from '@/components/VisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { variableTemplateVariantStyles } from './variants';
import { variableTemplateStyles } from './VariableTemplate.styles';
import { variableTemplateTheme } from './VariableTemplate.stylex';

export const VariableTemplate = forwardRef<
  HTMLDivElement,
  IVariableTemplateProps
>(function VariableTemplate(props, forwardedRef) {
  const {
    styles,
    sx,
    visualState: visualStateProp,
    variant = 'primary',
    children,
    ...other
  } = props;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } =
    useVisualState(visualStateProp);
  const handleRef = useMergeRefs([forwardedRef, actionRef, setVisualStateRef]);

  const { overridenStyles } = useComponentTheme('VariableTemplate');
  const variantStyles = variant
    ? variableTemplateVariantStyles[variant]
    : undefined;

  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory(variableTemplateStyles, variantStyles, styles),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  return (
    <div
      {...sxf(variableTemplateTheme, overridenStyles, 'host', sx)}
      {...other}
      ref={handleRef}
    >
      {children}
    </div>
  );
});
