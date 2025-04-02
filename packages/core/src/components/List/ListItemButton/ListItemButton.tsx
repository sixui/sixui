import { useCallback, useState } from 'react';

import type { IListItemButtonThemeFactory } from './ListItemButton.css';
import type { IListItemButtonFactory } from './ListItemButton.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useListContext } from '~/components/List/List.context';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { ListItem } from '../ListItem';
import { COMPONENT_NAME } from './ListItemButton.constants';
import {
  listItemButtonTheme,
  listItemButtonThemeVariants,
} from './ListItemButton.css';

/**
 * @see https://m3.material.io/components/items/overview
 */
export const ListItemButton =
  polymorphicComponentFactory<IListItemButtonFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'standard',
      start,
      children,
      end,
      disabled: disabledProp,
      readOnly,
      selected,
      active,
      loading: loadingProp,
      onClick,
      leading,
      leadingIcon,
      leadingImage,
      leadingVideo,
      trailing,
      trailingIcon,
      noFocusRing: noFocusRingProp,
      interactionsMergeStrategy,
      lineClamp,
      overline,
      supportingText,
      trailingSupportingText,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const listContext = useListContext();
    const [handlingClick, setHandlingClick] = useState(false);

    const loading = loadingProp || handlingClick;
    const disabled = disabledProp || loading;
    const disabledOrReadOnly = disabled || readOnly;
    const noFocusRing = listContext?.noFocusRing ?? noFocusRingProp;

    const { getStyles } = useComponentTheme<IListItemButtonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: listItemButtonTheme,
      themeVariants: listItemButtonThemeVariants,
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

    return (
      <ButtonBase
        {...getStyles('root', {
          modifiers: {
            selected,
            disabled: disabledOrReadOnly,
          },
        })}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        noFocusRing={noFocusRing}
        focusRingProps={{ variant: 'inward' }}
        ref={forwardedRef}
        interactionsMergeStrategy={interactionsMergeStrategy}
        disabled={disabled}
        readOnly={readOnly}
        onClick={handleClick}
        {...other}
      >
        <ListItem
          {...getStyles('listItem')}
          selected={selected}
          active={active}
          loading={loading}
          start={start}
          leading={leading}
          leadingIcon={leadingIcon}
          leadingImage={leadingImage}
          leadingVideo={leadingVideo}
          end={end}
          trailing={trailing}
          trailingIcon={trailingIcon}
          lineClamp={lineClamp}
          disabled={disabled}
          overline={overline}
          supportingText={supportingText}
          trailingSupportingText={trailingSupportingText}
        >
          {children}
        </ListItem>
      </ButtonBase>
    );
  });

ListItemButton.displayName = `@sixui/core/${COMPONENT_NAME}`;
ListItemButton.theme = listItemButtonTheme;
