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
    const styleProps = useMemo(
      () =>
        stylePropsFactory<ICardTitleStyleKey, ICardTitleStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...styleProps(['host', sx], [theme.vars])} ref={ref} {...other}>
        <div {...styleProps(['header'])}>
          {headline ? (
            <div {...styleProps(['headline'])}>{headline}</div>
          ) : null}
          {subhead ? <div {...styleProps(['subhead'])}>{subhead}</div> : null}
        </div>
        {supportingText ? (
          <div {...styleProps(['supportingText'])}>{supportingText}</div>
        ) : null}
      </div>
    );
  },
);
