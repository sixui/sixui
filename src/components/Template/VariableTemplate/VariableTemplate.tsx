import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IVariableTemplateProps } from './VariableTemplate.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useVisualState } from '../../VisualState';
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

  const variantStyles = variant
    ? variableTemplateVariantStyles[variant]
    : undefined;
  const { combineStyles, globalStyles } = useStyles({
    name: 'VariableTemplate',
    styles: [variableTemplateStyles, variantStyles, styles],
    visualState,
  });

  return (
    <Base
      {...other}
      visualState={visualState}
      sx={[variableTemplateTheme, globalStyles, combineStyles('host'), sx]}
      ref={handleRef}
    >
      {children}
    </Base>
  );
});
