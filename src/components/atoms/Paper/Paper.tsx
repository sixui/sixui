import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
  IPaperVariant,
} from './Paper.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts

export type IPaperProps = IContainerProps<IPaperStyleKey> & {
  variant?: IPaperVariant | false;
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  children?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  square?: boolean;
};

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

export const Paper = forwardRef<HTMLDivElement, IPaperProps>(
  function Paper(props, ref) {
    const {
      styles,
      sx,
      variant = 'filled',
      innerStyles,
      children,
      elevation: elevationProp,
      square,
      ...other
    } = props;

    const { theme, variantTheme } = useComponentTheme(
      'Paper',
      variant ? variantMap[variant] : undefined,
    );
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
      [theme.styles, variantTheme?.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IPaperStyleKey, IPaperStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    const elevation = variant === 'outlined' ? 0 : elevationProp || 0;

    return (
      <div
        {...sxf(
          'host',
          `host$elevation${elevation}`,
          square && 'host$square',
          theme.vars,
          variantTheme?.vars,
          sx,
        )}
        ref={ref}
        {...other}
      >
        <Elevation
          styles={[
            theme.elevationStyles,
            variantTheme?.elevationStyles,
            ...asArray(innerStyles?.elevation),
          ]}
        />
        <div {...sxf('outline')} />
        <div {...sxf('background')} />
        <div {...sxf('content')}>{children}</div>
      </div>
    );
  },
);
