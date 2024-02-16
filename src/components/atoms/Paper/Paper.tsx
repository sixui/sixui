import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type { IZeroOrMore, ICompiledStyles } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
  IPaperVariant,
} from './Paper.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation, IElevationStyleKey } from '@/components/utils/Elevation';

export interface IPaperProps
  extends IContainer<IPaperStyleKey, IPaperStyleVarKey> {
  variant?: IPaperVariant;
  children?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  square?: boolean;
  elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
}

type IPaperVariantMap = {
  [key in IPaperVariant]: keyof Pick<
    IThemeComponents,
    'FilledPaper' | 'OutlinedPaper'
  >;
};

const variantMap: IPaperVariantMap = {
  filled: 'FilledPaper',
  outlined: 'OutlinedPaper',
};

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts
export const Paper: React.FC<IPaperProps> = ({
  variant = 'filled',
  children,
  square,
  ...props
}) => {
  const theme = useComponentTheme('Paper');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionRef = React.useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IPaperStyleKey, IPaperStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const hasOutline =
    theme.styles?.outline ||
    variantTheme.styles?.outline ||
    asArray(props.styles).some((styles) => !!styles?.outline);
  const elevation = variant === 'outlined' ? 0 : props.elevation || 0;

  return (
    <div
      {...styleProps(
        [
          'host',
          `host$elevation${elevation}`,
          square && 'host$square',
          props.sx,
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
    >
      <Elevation
        styles={[
          theme.elevationStyles,
          variantTheme.elevationStyles,
          ...asArray(props.elevationStyles),
        ]}
      />
      {hasOutline ? <div {...styleProps(['outline'])} /> : null}
      <div {...styleProps(['background'])} />
      <div {...styleProps(['content'])}>{children}</div>
    </div>
  );
};
