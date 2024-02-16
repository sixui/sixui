import * as React from 'react';

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
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div {...styleProps(['host', props.sx], [theme.vars, props.theme])}>
      {container ? <div {...styleProps(['container'])}>{container}</div> : null}

      {start ? (
        <div {...styleProps(['nonText'])}>
          <div {...styleProps(['center', 'start'])}>{start}</div>
        </div>
      ) : null}

      <div {...styleProps(['text'])}>
        {overline ? <div {...styleProps(['overline'])}>{overline}</div> : null}
        <div {...styleProps(['children'])}>{children}</div>
        {headline ? <div {...styleProps(['headline'])}>{headline}</div> : null}
        {supportingText ? (
          <div {...styleProps(['supportingText'])}>{supportingText}</div>
        ) : null}
      </div>

      {trailingSupportingText ? (
        <div {...styleProps(['text'])}>
          <div {...styleProps(['center', 'trailingSupportingText'])}>
            {trailingSupportingText}
          </div>
        </div>
      ) : null}

      {end ? (
        <div {...styleProps(['nonText'])}>
          <div {...styleProps(['center', 'end'])}>{end}</div>
        </div>
      ) : null}
    </div>
  );
};
