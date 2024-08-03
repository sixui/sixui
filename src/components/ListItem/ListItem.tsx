import { forwardRef, useContext, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type {
  LIST_ITEM_DEFAULT_TAG,
  IListItemOwnProps,
  IListItemProps,
} from './ListItem.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useVisualState } from '~/components/VisualState';
import { StateLayer } from '~/components/StateLayer';
import { FocusRing } from '~/components/FocusRing';
import { Item } from '~/components/Item';
import { commonStyles } from '~/helpers/commonStyles';
import { ListContext } from '~/components/List/ListContext';
import { listItemVariantStyles } from './variants';
import {
  listItemFocusRingStyles,
  listItemItemStyles,
  listItemStateLayerStyles,
  listItemStyles,
  type IListItemStylesKey,
} from './ListItem.styles';
import { listItemTheme } from './ListItem.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/list-item.ts

type IListItem = <
  TRoot extends React.ElementType = typeof LIST_ITEM_DEFAULT_TAG,
>(
  props: IListItemProps<TRoot>,
) => React.ReactNode;

export const ListItem: IListItem = forwardRef(function ListItem<
  TRoot extends React.ElementType = typeof LIST_ITEM_DEFAULT_TAG,
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

  const componentTheme = useComponentTheme('ListItem');
  const variantStyles = variant ? listItemVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IListItemStylesKey>(
        listItemStyles,
        variantStyles,
        styles,
      ),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
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
    (type == 'link'
      ? (componentTheme.settings?.linkAs ?? 'a')
      : type === 'button'
        ? 'button'
        : 'li');

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
              listItemStateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ]}
            for={actionRef}
            disabled={disabled}
            visualState={visualState}
          />
          {noFocusRing ? null : (
            <FocusRing
              styles={[
                listItemFocusRingStyles,
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
      {...sxf(
        listItemTheme,
        componentTheme.overridenStyles,
        'host',
        `host$${adaptedSize}`,
        isInteractive && 'host$interactive',
        selected && 'host$selected',
        disabled && 'host$disabled',
        !start && !leadingVideo && 'host$leadingSpace',
        !end && 'host$trailingSpace',
        sx,
      )}
    >
      <Item
        styles={[listItemItemStyles, ...asArray(innerStyles?.item)]}
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
