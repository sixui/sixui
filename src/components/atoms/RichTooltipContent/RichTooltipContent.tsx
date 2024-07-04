import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { isFunction } from 'lodash';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IRichTooltipContentStyleKey,
  IRichTooltipContentStyleVarKey,
} from './RichTooltipContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';

export type IRichTooltipContentActionsRenderProps = {
  onClose?: (event: React.MouseEvent) => void;
};

export type IRichTooltipContentProps =
  IContainerProps<IRichTooltipContentStyleKey> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    };
    subhead?: React.ReactNode;
    supportingText: React.ReactNode;
    actions?:
      | React.ReactNode
      | ((props: IRichTooltipContentActionsRenderProps) => React.ReactNode);
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
    onClose?: (event: React.MouseEvent) => void;
  };

export const RichTooltipContent = forwardRef<
  HTMLDivElement,
  IRichTooltipContentProps
>(function RichTooltipContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    subhead,
    supportingText,
    actions,
    renderCursor,
    onClose,
    ...other
  } = props;

  const { theme } = useComponentTheme('RichTooltipContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IRichTooltipContentStyleKey,
        IRichTooltipContentStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
      <Elevation
        styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
      />
      {renderCursor ? renderCursor(sxf('cursor')) : null}
      <div {...sxf('content')}>
        <div {...sxf('subhead')}>{subhead}</div>
        <div {...sxf('supportingText')}>{supportingText}</div>
      </div>
      {actions ? (
        <div {...sxf('actions')}>
          {isFunction(actions) ? actions({ onClose }) : actions}
        </div>
      ) : null}
    </div>
  );
});
