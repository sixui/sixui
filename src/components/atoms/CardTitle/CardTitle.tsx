import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  ICardTitleStyleKey,
  ICardTitleStyleVarKey,
} from './CardTitle.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ICardTitleProps = IContainerProps<
  ICardTitleStyleKey,
  ICardTitleStyleVarKey
> & {
  headline?: React.ReactNode;
  subhead?: React.ReactNode;
  supportingText?: React.ReactNode;
};

export const CardTitle: React.FC<ICardTitleProps> = ({
  headline,
  subhead,
  supportingText,
  ...props
}) => {
  const theme = useComponentTheme('CardTitle');

  const styleProps = useMemo(
    () =>
      stylePropsFactory<ICardTitleStyleKey, ICardTitleStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div {...styleProps(['host', props.sx], [theme.vars, props.theme])}>
      <div {...styleProps(['header'])}>
        {headline ? <div {...styleProps(['headline'])}>{headline}</div> : null}
        {subhead ? <div {...styleProps(['subhead'])}>{subhead}</div> : null}
      </div>
      {supportingText ? (
        <div {...styleProps(['supportingText'])}>{supportingText}</div>
      ) : null}
    </div>
  );
};
