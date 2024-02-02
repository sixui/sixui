import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IItemStyleKey, IItemStyleVarKey } from './Item.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IItemProps
  extends IContainer<IItemStyleKey, IItemStyleVarKey> {
  container?: React.ReactNode;
  overline?: React.ReactNode;
  start?: React.ReactNode;
  children: React.ReactNode;
  headline?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
}

// https://github.com/material-components/material-web/blob/main/labs/item/item.ts
export const Item: React.FC<IItemProps> = ({
  children,
  container,
  start,
  end,
  overline,
  headline,
  supportingText,
  trailingSupportingText,
  ...props
}) => {
  const theme = useComponentTheme('Item');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IItemStyleKey, IItemStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const textRef = React.useRef<HTMLDivElement>(null);

  return (
    <div {...styleProps(['host'], [theme.vars, props.theme])}>
      {container ? <div {...styleProps(['container'])}>{container}</div> : null}
      {start ? <div {...styleProps(['nonText'])}>{start}</div> : null}

      <div {...styleProps(['text'])} ref={textRef}>
        {overline ? <div {...styleProps(['overline'])}>{overline}</div> : null}
        <div {...styleProps(['children'])}>{children}</div>
        {headline ? <div {...styleProps(['headline'])}>{headline}</div> : null}
        {supportingText ? (
          <div {...styleProps(['supportingText'])}>{supportingText}</div>
        ) : null}
      </div>

      {trailingSupportingText ? (
        <div {...styleProps(['nonText', 'trailingSupportingText'])}>
          {trailingSupportingText}
        </div>
      ) : null}

      {end ? <div {...styleProps(['nonText'])}>{end}</div> : null}
    </div>
  );
};
