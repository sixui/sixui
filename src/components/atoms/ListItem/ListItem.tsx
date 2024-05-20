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
} from '@/helpers/react/polymorphicComponentTypes';
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
} from '@/components/atoms/Item';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts

const DEFAULT_TAG = 'button';

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

    selected?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
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
    disabled,
    selected: selectedProp,
    target: targetProp,
    leadingIcon,
    trailingIcon,
    onClick,
    ...other
  } = props as IWithAsProp<IListItemOwnProps>;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

  const { theme, settings } = useComponentTheme('ListItem');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const type = href !== undefined ? 'link' : onClick ? 'button' : 'text';
  const role = type === 'text' ? 'listitem' : undefined;
  const selected = !disabled && selectedProp;
  const isInteractive = type !== 'text';
  const target = type === 'link' && targetProp ? targetProp : undefined;
  const hasLeadingContent = !!leadingIcon || !!start;
  const hasTrailingContent = !!trailingIcon || !!end;

  const Component =
    as ??
    (type == 'link'
      ? settings?.linkAs ?? 'a'
      : type === 'button'
        ? 'button'
        : 'li');

  return (
    <Component
      {...sxf(
        'host',
        isInteractive && 'host$interactive',
        selected && 'host$selected',
        disabled && 'host$disabled',
        hasLeadingContent && 'host$hasLeadingContent',
        hasTrailingContent && 'host$hasTrailingContent',
        theme.vars,
        sx,
      )}
      sx={sx}
      role={role}
      type={type === 'button' ? 'button' : undefined}
      ref={handleRef}
      tabIndex={disabled || !isInteractive ? -1 : 0}
      disabled={disabled}
      aria-current={selected}
      href={href}
      target={target}
      onClick={onClick}
      {...other}
    >
      <Item
        styles={[theme.itemStyles, ...asArray(innerStyles?.item)]}
        container={
          <>
            <div
              {...sxf(
                'background',
                selected && 'background$selected',
                disabled && 'background$disabled',
              )}
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
        start={
          leadingIcon ? (
            <div
              {...sxf(
                'icon',
                'icon$leading',
                disabled && 'icon$leading$disabled',
                selected && 'icon$leading$selected',
              )}
            >
              {leadingIcon}
            </div>
          ) : (
            start
          )
        }
        headline={headline}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        end={
          trailingIcon ? (
            <div
              {...sxf(
                'icon',
                'icon$trailing',
                disabled && 'icon$trailing$disabled',
                selected && 'icon$trailing$selected',
              )}
            >
              {trailingIcon}
            </div>
          ) : (
            end
          )
        }
      >
        {children}
      </Item>
    </Component>
  );
});
