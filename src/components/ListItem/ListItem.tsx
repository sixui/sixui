import { forwardRef, useContext, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { IListItemProps } from './ListItem.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { commonStyles } from '~/helpers/commonStyles';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { StateLayer } from '../StateLayer';
import { FocusRing } from '../FocusRing';
import { Item } from '../Item';
import { ListContext } from '../List/ListContext';
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

export const ListItem = createPolymorphicComponent<'button', IListItemProps>(
  forwardRef<HTMLButtonElement, IListItemProps>(
    function ListItem(props, forwardedRef) {
      const {
        component,
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
      } = props as IWithAsProp<IListItemProps>;

      const actionRef = useRef<HTMLButtonElement>(null);
      const { visualState, setRef: setVisualStateRef } = useVisualState(
        visualStateProp,
        { disabled },
      );
      const handleRef = useMergeRefs([
        forwardedRef,
        setVisualStateRef,
        actionRef,
      ]);

      const variantStyles = variant
        ? listItemVariantStyles[variant]
        : undefined;
      const { combineStyles, getStyles, globalStyles, settings } =
        useStyles<IListItemStylesKey>({
          name: 'ListItem',
          styles: [listItemStyles, variantStyles, styles],
          visualState,
        });

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

      const rootElement =
        component ??
        (type == 'link'
          ? (settings?.linkAs ?? 'a')
          : type === 'button'
            ? 'button'
            : 'li');

      const renderContainer = (): React.ReactNode => (
        <>
          <div
            {...getStyles(
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
          <div {...getStyles('leading')}>
            <div
              {...getStyles(
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
          <div {...getStyles('leading')}>
            <div
              {...getStyles(
                'image',
                commonStyles.backgroundImage(leadingImage),
              )}
            />
          </div>
        ) : leadingVideo ? (
          <video {...getStyles('video')} autoPlay={!disabled} loop muted>
            {leadingVideo.map((video, videoIndex) => (
              <source key={videoIndex} src={video.src} type={video.type} />
            ))}
          </video>
        ) : leading ? (
          <div {...getStyles('leading')}>{leading}</div>
        ) : undefined);

      const renderEnd = (): React.ReactNode =>
        end ??
        (trailingIcon ? (
          <div
            {...getStyles(
              'icon',
              'icon$trailing',
              disabled && 'icon$trailing$disabled',
              selected && 'icon$trailing$selected',
            )}
          >
            {trailingIcon}
          </div>
        ) : trailing ? (
          <div {...getStyles('trailing')}>{trailing}</div>
        ) : undefined);

      return (
        <Base
          component={rootElement}
          role={role}
          type={type === 'button' ? 'button' : undefined}
          tabIndex={disabled || !isInteractive ? -1 : 0}
          disabled={disabled}
          aria-current={selected}
          href={href}
          target={target}
          onClick={onClick}
          {...other}
          visualState={visualState}
          sx={[
            listItemTheme,
            globalStyles,
            combineStyles(
              'host',
              `host$${adaptedSize}`,
              isInteractive && 'host$interactive',
              selected && 'host$selected',
              disabled && 'host$disabled',
              !start && !leadingVideo && 'host$leadingSpace',
              !end && 'host$trailingSpace',
            ),
            sx,
          ]}
          ref={handleRef}
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
        </Base>
      );
    },
  ),
);
