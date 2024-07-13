import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  IPaperStyleKey,
  IPaperStyleVarKey,
  IPaperVariant,
} from './Paper.styledefs';
import type { IPaperProps } from './PaperProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { Elevation } from '@/components/utils/Elevation';

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts

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
  function Paper(props, forwardedRef) {
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

    const { theme, variantTheme } = useComponentThemeOld(
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

    const elevation = variant === 'outlined' ? 0 : elevationProp ?? 0;

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
        ref={forwardedRef}
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
