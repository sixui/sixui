import type { IListItemThemeFactory } from './ListItem.css';
import type { IListItemFactory } from './ListItem.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { Item } from '../Item';
import { useListContext } from '../List/List.context';
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
    const noFocusRing = listContext?.noFocusRing ?? noFocusRingProp;

    const selected = !disabled && selectedProp;
    const hasLeading = !!start || !!leadingVideo;
    const hasTrailing = !!end;

    const { getStyles } = useComponentTheme<IListItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: listItemTheme,
      themeVariants: listItemVariants,
      variant,
      modifiers: {
        selected,
        disabled,
        'with-leading': hasLeading,
        'with-trailing': hasTrailing,
      },
    });

    const renderStart = (): React.ReactNode =>
      start ??
      (leadingIcon ? (
        <div {...getStyles(['icon', 'icon$leading'])}>{leadingIcon}</div>
      ) : leadingImage ? (
        <div
          {...getStyles('image', {
            style: { backgroundImage: `url(${leadingImage})` },
          })}
        />
      ) : leadingVideo ? (
        <video {...getStyles('video')} autoPlay={!disabled} loop muted>
          {leadingVideo.map((video, videoIndex) => (
            <source key={videoIndex} src={video.src} type={video.type} />
          ))}
        </video>
      ) : (
        leading
      ));

    const renderEnd = (): React.ReactNode =>
      end ??
      (trailingIcon ? (
        <div {...getStyles(['icon', 'icon$trailing'])}>{trailingIcon}</div>
      ) : (
        trailing
      ));

    const shouldRenderAsButton =
      other.as === 'button' ||
      other.as === 'a' ||
      !!other.onClick ||
      !!other.href;

    const renderItem = (): React.JSX.Element => (
      <Item
        {...getStyles('item')}
        overline={overline}
        start={renderStart()}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        end={renderEnd()}
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
          focusRing={noFocusRing ? false : 'inward'}
          ref={forwardedRef}
          interactionsMergeStrategy={interactionsMergeStrategy}
          disabled={disabled}
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
