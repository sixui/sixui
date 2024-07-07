import { forwardRef, useContext, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IListItemVariant, IListItemStyleKey } from './ListItem.styledefs';
import type { IThemeComponents } from '@/components/utils/Theme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  useVisualState,
  type IVisualState,
} from '@/components/utils/VisualState';
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
import { commonStyles } from '@/helpers/commonStyles';
import { ListContext } from '@/components/atoms/List/ListContext';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts

const DEFAULT_TAG = 'button';

export type IListItemOwnProps = IContainerProps<IListItemStyleKey> &
  Pick<React.AriaAttributes, 'aria-expanded'> &
  IOmit<IItemProps, 'container'> & {
    innerStyles?: {
      item?: IZeroOrMore<ICompiledStyles<IItemStyleKey>>;
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    };
    variant?: IListItemVariant | false;
    visualState?: IVisualState;
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

    /**
     * Disables the item and makes it non-selectable and non-interactive.
     */
    disabled?: boolean;

    selected?: boolean;
    leading?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    leadingImage?: string;
    leadingVideo?: Array<{ type: string; src: string }>;
    trailing?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    noFocusRing?: boolean;
    maxLines?: number;
  };

export type IListItemProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IListItemOwnProps>;

type IListItemVariantMap = {
  [key in IListItemVariant]: keyof Pick<
    IThemeComponents,
    'StandardListItem' | 'DangerListItem'
  >;
};

const variantMap: IListItemVariantMap = {
  standard: 'StandardListItem',
  danger: 'DangerListItem',
};

type IListItem = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IListItemProps<TRoot>,
) => React.ReactNode;

export const ListItem: IListItem = forwardRef(function ListItem<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IListItemProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    innerStyles,
    variant = 'standard',
    visualState: visualStateProp,
    href,
    overline,
    start,
    children,
    supportingText,
    trailingSupportingText,
    end,
    disabled,
    selected: selectedProp,
    target: targetProp,
    leading,
    leadingIcon,
    leadingImage,
    leadingVideo,
    trailing,
    trailingIcon,
    onClick,
    size: sizeProp = 'md',
    noFocusRing: noFocusRingProp,
    maxLines,
    ...other
  } = props as IWithAsProp<IListItemOwnProps>;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef, actionRef]);

  const { theme, variantTheme, settings } = useComponentTheme(
    'ListItem',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IListItemStyleKey, IItemStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const listContext = useContext(ListContext);
  const type = href !== undefined ? 'link' : onClick ? 'button' : 'text';
  const role = type === 'text' ? 'listitem' : undefined;
  const selected = !disabled && selectedProp;
  const isInteractive = type !== 'text';
  const target = type === 'link' && targetProp ? targetProp : undefined;
  const size = listContext?.size ?? sizeProp;
  const adaptedSize =
    size === 'md' && (!!supportingText || !!leadingVideo) ? 'lg' : size;
  const noFocusRing = listContext?.noFocusRing ?? noFocusRingProp;

  const Component =
    as ??
    (type == 'link' ? settings.linkAs : type === 'button' ? 'button' : 'li');

  const renderContainer = (): React.ReactNode => (
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
              variantTheme?.stateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ]}
            for={actionRef}
            disabled={disabled}
            visualState={visualState}
          />
          {noFocusRing ? null : (
            <FocusRing
              styles={[
                theme.focusRingStyles,
                variantTheme?.focusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              for={actionRef}
              visualState={visualState}
              inward
            />
          )}
        </>
      ) : null}
    </>
  );

  const renderStart = (): React.ReactNode =>
    start ??
    (leadingIcon ? (
      <div {...sxf('leading')}>
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
      </div>
    ) : leadingImage ? (
      <div {...sxf('leading')}>
        <div {...sxf('image', commonStyles.backgroundImage(leadingImage))} />
      </div>
    ) : leadingVideo ? (
      <video {...sxf('video')} autoPlay={!disabled} loop muted>
        {leadingVideo.map((video, videoIndex) => (
          <source key={videoIndex} src={video.src} type={video.type} />
        ))}
      </video>
    ) : leading ? (
      <div {...sxf('leading')}>{leading}</div>
    ) : undefined);

  const renderEnd = (): React.ReactNode =>
    end ??
    (trailingIcon ? (
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
    ) : trailing ? (
      <div {...sxf('trailing')}>{trailing}</div>
    ) : undefined);

  return (
    <Component
      {...sxf(
        'host',
        `host$${adaptedSize}`,
        isInteractive && 'host$interactive',
        selected && 'host$selected',
        disabled && 'host$disabled',
        !start && !leadingVideo && 'host$leadingSpace',
        !end && 'host$trailingSpace',
        theme.vars,
        variantTheme?.vars,
        sx,
      )}
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
        styles={[
          theme.itemStyles,
          variantTheme?.itemStyles,
          ...asArray(innerStyles?.item),
        ]}
        container={renderContainer()}
        overline={overline}
        start={renderStart()}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        end={renderEnd()}
        maxLines={maxLines}
      >
        {children}
      </Item>
    </Component>
  );
});
