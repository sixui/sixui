import { useMemo } from 'react';

import type { IListItemThemeFactory } from './ListItem.css';
import type { IListItemFactory } from './ListItem.types';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Item } from '~/components/Item';
import { Overlayable } from '~/components/Overlayable';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './ListItem.constants';
import { listItemTheme } from './ListItem.css';

/**
 * @see https://m3.material.io/components/items/overview
 */
export const ListItem = polymorphicComponentFactory<IListItemFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'standard',
      overline,
      start,
      children,
      supportingText,
      trailingSupportingText,
      end,
      disabled,
      selected: selectedProp,
      loading,
      leading,
      leadingIcon,
      leadingImage,
      leadingVideo,
      trailing,
      trailingIcon,
      active: activeProp,
      hoverable: hoverableProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const readOnly = loading;
    const disabledOrReadOnly = disabled || readOnly;
    const active = !disabledOrReadOnly && activeProp;
    const selected = !disabledOrReadOnly && selectedProp;
    const hoverable = !disabledOrReadOnly && hoverableProp;
    const hasLeading = !!start || !!leadingVideo;
    const hasTrailing = !!end;
    const hasStartSlot =
      !!start || !!leadingIcon || !!leadingImage || !!leadingVideo || !!leading;
    const hasEndSlot = !!end || !!trailingIcon || !!trailing;

    const { getStyles } = useComponentTheme<IListItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: listItemTheme,
    });

    const modifiers = {
      selected,
      disabled: disabledOrReadOnly,
      'with-leading': hasLeading,
      'with-trailing': hasTrailing,
      'with-start-slot': hasStartSlot,
      'with-end-slot': hasEndSlot,
      active,
    };

    const startSlot = useMemo(
      (): React.ReactNode =>
        hasStartSlot && (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator
                {...getStyles(['icon', 'icon$leading'])}
              />
            }
            visible={loading && (!!leadingIcon || !trailingIcon)}
          >
            {start ??
              (leadingIcon ? (
                <div {...getStyles(['icon', 'icon$leading'])}>
                  {leadingIcon}
                </div>
              ) : leadingImage ? (
                <div
                  {...getStyles('image', {
                    style: { backgroundImage: `url(${leadingImage})` },
                  })}
                />
              ) : leadingVideo ? (
                <video {...getStyles('video')} autoPlay={!disabled} loop muted>
                  {leadingVideo.map((video, videoIndex) => (
                    <source
                      key={videoIndex}
                      src={video.src}
                      type={video.type}
                    />
                  ))}
                </video>
              ) : (
                leading
              ))}
          </Overlayable>
        ),
      [
        disabled,
        getStyles,
        hasStartSlot,
        leading,
        leadingIcon,
        trailingIcon,
        leadingImage,
        leadingVideo,
        loading,
        start,
      ],
    );

    const endSlot = useMemo(
      (): React.ReactNode =>
        hasEndSlot ? (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator
                {...getStyles(['icon', 'icon$trailing'])}
              />
            }
            visible={loading && !leadingIcon}
          >
            {end ??
              (trailingIcon ? (
                <div {...getStyles(['icon', 'icon$trailing'])}>
                  {trailingIcon}
                </div>
              ) : (
                trailing
              ))}
          </Overlayable>
        ) : loading && !hasStartSlot ? (
          <IndeterminateCircularProgressIndicator
            {...getStyles(['icon', 'icon$trailing'])}
          />
        ) : undefined,
      [
        end,
        getStyles,
        hasEndSlot,
        leadingIcon,
        loading,
        trailing,
        trailingIcon,
        hasStartSlot,
      ],
    );

    return (
      <Item
        {...getStyles(['root', hoverable && 'root$hoverable'], { modifiers })}
        overline={overline}
        start={startSlot}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        end={endSlot}
        ref={forwardedRef}
        {...other}
      >
        {children}
      </Item>
    );
  },
);

ListItem.displayName = `@sixui/core/${COMPONENT_NAME}`;
ListItem.theme = listItemTheme;
