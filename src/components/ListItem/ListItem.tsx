import type { MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';

import type { IListItemThemeFactory } from './ListItem.css';
import type { IListItemFactory } from './ListItem.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Item } from '../Item';
import { useListContext } from '../List/List.context';
import { Overlayable } from '../Overlayable';
import { Paper } from '../Paper';
import { listItemTheme, listItemVariants } from './ListItem.css';

const COMPONENT_NAME = 'ListItem';

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
      loadingText,
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
    const hasOverlay =
      loading && (!!loadingText || (!hasStartSlot && !hasEndSlot));

    const { getStyles } = useComponentTheme<IListItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: listItemTheme,
      themeVariants: listItemVariants,
      modifiers: {
        selected,
        disabled: disabledOrReadOnly,
        'with-leading': hasLeading,
        'with-trailing': hasTrailing,
      },
    });

    const handleClick: MouseEventHandler = useCallback(
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
        hasEndSlot && (
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
        ),
      [
        end,
        getStyles,
        hasEndSlot,
        leadingIcon,
        loading,
        trailing,
        trailingIcon,
      ],
    );

    const shouldRenderAsButton =
      other.as === 'button' || other.as === 'a' || !!onClick || !!other.href;

    const renderLabelSlot = useCallback(
      () => (
        <Overlayable
          overlay={
            loadingText ?? (
              <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
            )
          }
          visible={hasOverlay}
        >
          {children}
        </Overlayable>
      ),
      [children, getStyles, loadingText, hasOverlay],
    );

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
        {renderLabelSlot()}
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
ListItem.displayName = `@sixui/${COMPONENT_NAME}`;
