import { useMemo, useRef } from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type { IZeroOrMore, ICompiledStyles } from '@/helpers/types';
import type { IContainerProps } from '@/components/utils/Container';
import type { IListItemStyleKey } from './ListItem.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState.old';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
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

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts

export type IListItemType = 'text' | 'button' | 'link';

export type IListItemProps = IContainerProps<IListItemStyleKey> &
  Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'target' | 'aria-expanded'
  > &
  Pick<
    IItemProps,
    | 'overline'
    | 'start'
    | 'children'
    | 'headline'
    | 'supportingText'
    | 'trailingSupportingText'
    | 'end'
  > & {
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
    stateLayerStyles?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    selected?: boolean;
  };

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
  const actionRef = useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        visualState,
      ),
    [theme.styles, props.styles, visualState],
  );

  const type = href ? 'link' : props.type ?? 'text';
  const disabled = props.disabled;
  const selected = !disabled && props.selected;
  const Component: React.ElementType = props.component
    ? props.component
    : type == 'link'
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
    <Component
      {...styleProps(
        [
          'host',
          isInteractive && 'host$interactive',
          selected && 'host$selected',
          disabled && 'host$disabled',
          props.sx,
        ],
        [theme.vars, props.theme],
      )}
      ref={actionRef}
      tabIndex={disabled || !isInteractive ? -1 : 0}
      disabled={disabled}
      role={role}
      aria-current={selected}
      aria-expanded={props['aria-expanded']}
      href={href}
      target={target}
    >
      <Item
        styles={[theme.itemStyles, ...asArray(props.itemStyles)]}
        theme={theme.itemVars}
        container={
          <>
            <div
              {...styleProps([
                'background',
                selected && 'background$selected',
                disabled && 'background$disabled',
              ])}
            />
            {isInteractive ? (
              <>
                <StateLayer
                  styles={[
                    theme.stateLayerStyles,
                    ...asArray(props.stateLayerStyles),
                  ]}
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
              </>
            ) : null}
          </>
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
  );
};
