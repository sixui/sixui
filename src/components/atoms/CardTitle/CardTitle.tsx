import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  ICardTitleStyleKey,
  ICardTitleStyleVarKey,
} from './CardTitle.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardTitleProps = IContainerProps<ICardTitleStyleKey> & {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
};

export const CardTitle = forwardRef<HTMLDivElement, ICardTitleProps>(
  function CardTitle(props, ref) {
    const { styles, sx, headline, subhead, supportingText, ...other } = props;

    const { theme } = useComponentTheme('CardTitle');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ICardTitleStyleKey, ICardTitleStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} ref={ref} {...other}>
        <div {...sxf('header')}>
          {headline ? <div {...sxf('headline')}>{headline}</div> : null}
          {subhead ? <div {...sxf('subhead')}>{subhead}</div> : null}
        </div>
        {supportingText ? (
          <div {...sxf('supportingText')}>{supportingText}</div>
        ) : null}
      </div>
    );
  },
);
