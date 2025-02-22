import { useCallback, useState } from 'react';

import type { IListItemThemeFactory } from './ListItem.css';
import type { IListItemFactory } from './ListItem.types';
import { ButtonBase } from '~/components/ButtonBase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Item } from '~/components/Item';
import { useListContext } from '~/components/List/List.context';
import { Overlayable } from '~/components/Overlayable';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './ListItem.constants';
import { listItemTheme, listItemThemeVariants } from './ListItem.css';

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
      loading: loadingProp,
      onClick,
      leading,
      leadingIcon,
      leadingImage,
      leadingVideo,
      trailing,
      trailingIcon,
      lineClamp,
      noFocusRing: noFocusRingProp,
      interactionsMergeStrategy,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const listContext = useListContext();
    const [handlingClick, setHandlingClick] = useState(false);

    const loading = loadingProp || handlingClick;
    const readOnly = loading;
    const disabledOrReadOnly = disabled || readOnly;
    const selected = !disabled && selectedProp;
    const hasLeading = !!start || !!leadingVideo;
    const hasTrailing = !!end;
    const noFocusRing = listContext?.noFocusRing ?? noFocusRingProp;
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
      themeVariants: listItemThemeVariants,
      modifiers: {
        selected,
        disabled: disabledOrReadOnly,
        'with-leading': hasLeading,
        'with-trailing': hasTrailing,
        'with-start-slot': hasStartSlot,
        'with-end-slot': hasEndSlot,
      },
    });

    const handleClick: React.MouseEventHandler = useCallback(
      (event) => {
        if (handlingClick || !onClick) {
          return;
        }

        void executeLazyPromise(
          () => onClick(event) as Promise<void>,
          setHandlingClick,
        );
      },
      [handlingClick, onClick],
    );

    const renderStartSlot = useCallback(
      (): React.ReactNode =>
        hasStartSlot && (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
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

    const renderEndSlot = useCallback(
      (): React.ReactNode =>
        hasEndSlot ? (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
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
          <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
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

    const shouldRenderAsButton =
      other.as === 'button' || other.as === 'a' || !!onClick || !!other.href;

    const renderItem = (): React.JSX.Element => (
      <Item
        {...getStyles('item')}
        overline={overline}
        start={renderStartSlot()}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        end={renderEndSlot()}
        lineClamp={lineClamp}
      >
        {children}
      </Item>
    );

    if (shouldRenderAsButton) {
      return (
        <ButtonBase
          {...getStyles('root')}
          classNames={mergeClassNames(classNames, {
            stateLayer: getStyles('stateLayer').className,
          })}
          noFocusRing={noFocusRing}
          focusRingProps={{ variant: 'inward' }}
          ref={forwardedRef}
          interactionsMergeStrategy={interactionsMergeStrategy}
          disabled={disabled}
          onClick={handleClick}
          {...other}
        >
          {renderItem()}
        </ButtonBase>
      );
    }

    return (
      <Paper
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        ref={forwardedRef}
        {...other}
      >
        {renderItem()}
      </Paper>
    );
  },
);

ListItem.theme = listItemTheme;
ListItem.displayName = `@sixui/core/${COMPONENT_NAME}`;
