import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IPlainTooltipContentStyleKey,
  IPlainTooltipContentStyleVarKey,
} from './PlainTooltipContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IPlainTooltipContentProps =
  IContainerProps<IPlainTooltipContentStyleKey> & {
    supportingText?: React.ReactNode;
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
  };

export const PlainTooltipContent = forwardRef<
  HTMLDivElement,
  IPlainTooltipContentProps
>(function PlainTooltipContent(props, forwardedRef) {
  const { styles, sx, supportingText, renderCursor, ...other } = props;

  const { theme } = useComponentTheme('PlainTooltipContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IPlainTooltipContentStyleKey,
        IPlainTooltipContentStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
      {renderCursor ? renderCursor(sxf('cursor')) : null}
      <div {...sxf('supportingText')}>{supportingText}</div>
    </div>
  );
});