import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  IStateLayerStyleKey,
  IStateLayerStyleVarKey,
} from './StateLayer.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useRipple } from './useRipple';

// https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts

export type IStateLayerProps = IContainerProps<
  IStateLayerStyleKey,
  IStateLayerStyleVarKey
> & {
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
};

export const StateLayer: React.FC<IStateLayerProps> = ({
  visualState,
  for: forElementRef,
  disabled,
  ...props
}) => {
  const theme = useComponentTheme('StateLayer');

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IStateLayerStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const { setHostRef, surfaceRef, pressed } = useRipple({
    visualState,
    for: forElementRef,
    disabled,
  });

  return (
    <div
      ref={setHostRef}
      {...styleProps(['host', props.sx], [theme.vars, props.theme])}
    >
      <div
        {...styleProps([
          'rippleSurface',
          visualState?.hovered && 'rippleSurface$hover',
          pressed && 'rippleSurface$pressed',
          !pressed && visualState?.pressed && 'rippleSurface$pressedStatic',
          visualState?.dragged && 'rippleSurface$dragged',
        ])}
        ref={surfaceRef}
      />
    </div>
  );
};
