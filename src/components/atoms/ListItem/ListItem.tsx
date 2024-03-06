import { forwardRef, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type { IListItemStyleKey } from './ListItem.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
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
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts

const DEFAULT_TAG = 'button';

export type IListItemType = 'text' | 'button' | 'link';

export type IListItemOwnProps = IContainerProps<IListItemStyleKey> &
  Pick<React.AriaAttributes, 'aria-expanded'> &
  Omit<IItemProps, 'container'> & {
    innerStyles?: {
      item?: IZeroOrMore<ICompiledStyles<IItemStyleKey>>;
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    };
    visualState?: IVisualState;
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

    /**
     * Disables the item and makes it non-selectable and non-interactive.
     */
    disabled?: boolean;

    /**
     * Sets the behavior of the list item, defaults to "text". Change to "link" or
     * "button" for interactive items.
     */
    type?: IListItemType;

    selected?: boolean;
  };

export type IListItemProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IListItemOwnProps>;

type IListItem = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IListItemProps<TRoot>,
) => React.ReactNode;

export const ListItem: IListItem = forwardRef(function ListItem<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IListItemProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    href,
    overline,
    start,
    children,
    headline,
    supportingText,
    trailingSupportingText,
    end,
    type: typeProp,
    disabled,
    selected: selectedProp,
    target: targetProp,
    ...other
  } = props as IWithAsProp<IListItemOwnProps>;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

  const { theme } = useComponentTheme('ListItem');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const type = href ? 'link' : typeProp ?? 'text';
  const selected = !disabled && selectedProp;
  const role =
    type === 'link' ? 'link' : type === 'button' ? 'button' : 'listitem';
  const isAnchor = type === 'link';
  const isInteractive = type !== 'text';
  const target = isAnchor && targetProp ? targetProp : undefined;

  const Component =
    as ?? (type == 'link' ? 'a' : type === 'button' ? 'button' : 'li');

  return (
    <Component
      {...styleProps(
        [
          'host',
          isInteractive && 'host$interactive',
          selected && 'host$selected',
          disabled && 'host$disabled',
          sx,
        ],
        [theme.vars],
      )}
      ref={handleRef}
      tabIndex={disabled || !isInteractive ? -1 : 0}
      disabled={disabled}
      role={role}
      aria-current={selected}
      href={href}
      target={target}
      {...other}
    >
      <Item
        styles={[theme.itemStyles, ...asArray(innerStyles?.item)]}
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
                    ...asArray(innerStyles?.stateLayer),
                  ]}
                  for={actionRef}
                  disabled={disabled}
                  visualState={visualState}
                />
                <FocusRing
                  styles={[
                    theme.focusRingStyles,
                    ...asArray(innerStyles?.focusRing),
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
});
