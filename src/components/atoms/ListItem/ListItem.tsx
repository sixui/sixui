import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IContainer } from '@/helpers/Container';
import type { IListItemStyleKey } from './ListItem.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Ripple } from '@/components/utils/Ripple';
import { FocusRing } from '@/components/utils/FocusRing';
import { type IItemProps, type IItemStyleVarKey, Item } from '../Item';

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
  const { theme } = useComponentTheme('Item');
  const {
    theme: variantTheme,
    styles,
    rippleStyles,
    focusRingStyles,
    itemStyles,
  } = useComponentTheme('ListItem');
  const actionElRef = React.useRef(null);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinatorFactory(styles, props.styles),
        visualState,
      ),
    [styles, props.styles, visualState],
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
        [theme, variantTheme, props.theme],
      )}
    >
      <Component
        {...styleProps([
          'listItem',
          isInteractive && 'listItem$interactive',
          disabled && 'listItem$disabled',
        ])}
        ref={actionElRef}
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
          styles={itemStyles}
          container={
            isInteractive ? (
              <React.Fragment>
                <Ripple
                  styles={rippleStyles}
                  for={actionElRef}
                  disabled={disabled}
                  visualState={visualState}
                />
                <FocusRing
                  styles={focusRingStyles}
                  for={actionElRef}
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
