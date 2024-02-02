import React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type { IZeroOrMore, ICompiledStyles } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IListItemStyleKey } from './ListItem.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import {
  type IItemProps,
  type IItemStyleVarKey,
  type IItemStyleKey,
  Item,
} from '../Item';

export type IListItemType = 'text' | 'button' | 'link';

export interface IListItemProps
  extends IContainer<IListItemStyleKey, IItemStyleVarKey>,
    Pick<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      | 'href'
      | 'target'
      | 'aria-selected'
      | 'aria-checked'
      | 'aria-expanded'
      | 'aria-haspopup'
    >,
    Pick<
      IItemProps,
      | 'overline'
      | 'start'
      | 'children'
      | 'headline'
      | 'supportingText'
      | 'trailingSupportingText'
      | 'end'
    > {
  /**
   * Disables the item and makes it non-selectable and non-interactive.
   */
  disabled?: boolean;

  /**
   * Sets the behavior of the list item, defaults to "text". Change to "link" or
   * "button" for interactive items.
   */
  type?: IListItemType;

  component?: React.ElementType;
  itemStyles?: IZeroOrMore<ICompiledStyles<IItemStyleKey>>;
  rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
}

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts
export const ListItem: React.FC<IListItemProps> = ({
  href,
  overline,
  start,
  children,
  headline,
  supportingText,
  trailingSupportingText,
  end,
  ...props
}) => {
  const theme = useComponentTheme('ListItem');
  const itemTheme = useComponentTheme('Item');
  const actionRef = React.useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        visualState,
      ),
    [theme.styles, props.styles, visualState],
  );

  const type = href ? 'link' : props.type ?? 'text';
  const disabled = props.disabled;
  const Component: React.ElementType =
    props.component ?? type == 'link'
      ? 'a'
      : type === 'button'
        ? 'button'
        : 'li';
  const role =
    type === 'link' ? 'link' : type === 'button' ? 'button' : 'listitem';
  const isAnchor = type === 'link';
  const isInteractive = type !== 'text';
  const target = isAnchor && props.target ? props.target : undefined;

  return (
    <div
      {...styleProps(
        ['host', disabled && 'host$disabled'],
        [itemTheme.vars, theme.vars, props.theme],
      )}
    >
      <Component
        {...styleProps([
          'listItem',
          isInteractive && 'listItem$interactive',
          disabled && 'listItem$disabled',
        ])}
        ref={actionRef}
        tabIndex={disabled || !isInteractive ? -1 : 0}
        disabled={disabled}
        role={role}
        aria-selected={props['aria-selected']}
        aria-checked={props['aria-checked']}
        aria-expanded={props['aria-expanded']}
        aria-haspopup={props['aria-haspopup']}
        href={href}
        target={target}
      >
        <Item
          styles={[theme.itemStyles, ...asArray(props.itemStyles)]}
          container={
            isInteractive ? (
              <React.Fragment>
                <Ripple
                  styles={[theme.rippleStyles, ...asArray(props.rippleStyles)]}
                  for={actionRef}
                  disabled={disabled}
                  visualState={visualState}
                />
                <FocusRing
                  styles={[
                    theme.focusRingStyles,
                    ...asArray(props.focusRingStyles),
                  ]}
                  for={actionRef}
                  visualState={visualState}
                  inward
                />
              </React.Fragment>
            ) : null
          }
          overline={overline}
          start={start}
          headline={headline}
          supportingText={supportingText}
          trailingSupportingText={trailingSupportingText}
          end={end}
        >
          {children}
        </Item>
      </Component>
    </div>
  );
};
