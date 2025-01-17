import type { IButtonBaseThemeFactory } from './ButtonBase.css';
import type { IButtonBaseFactory } from './ButtonBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { FocusRing } from '../FocusRing';
import { Paper } from '../Paper';
import { useSixuiContext } from '../SixuiProvider';
import { StateLayer } from '../StateLayer';
import { useStateLayer } from '../StateLayer/useStateLayer';
import { TouchTarget } from '../TouchTarget';
import { buttonBaseTheme } from './ButtonBase.css';

const COMPONENT_NAME = 'ButtonBase';

export const ButtonBase = polymorphicComponentFactory<IButtonBaseFactory>(
  (props, forwardedRef) => {
    const {
      as,
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      focusRingProps,
      noFocusRing,
      disabled,
      readOnly,
      type = 'button',
      stateLayer: stateLayerProp,
      interactions,
      interactionsMergeStrategy,
      href,
      onClick,
      target,
      rel,
      touchTargetRenderer,
      nonInteractive,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sixuiContext = useSixuiContext();
    const disabledOrReadOnly = disabled || readOnly;

    const { getStyles } = useComponentTheme<IButtonBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: buttonBaseTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        'non-interactive': nonInteractive,
      },
    });

    const ownStateLayer = useStateLayer<HTMLDivElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: !!stateLayerProp || disabledOrReadOnly || nonInteractive,
      clickThrough: !onClick && !nonInteractive,
    });
    const stateLayer = stateLayerProp ?? ownStateLayer;
    const rootElement =
      as ??
      (nonInteractive
        ? 'div'
        : href
          ? (sixuiContext.settings?.linkAs ?? 'a')
          : 'button');

    const attributes = nonInteractive
      ? {
          'aria-disabled': disabledOrReadOnly || undefined,
        }
      : rootElement === 'button'
        ? {
            type,
            disabled,
          }
        : {
            role: 'button',
            href,
            target: rootElement === 'a' ? target : undefined,
            type: rootElement === 'input' ? type : undefined,
            disabled: rootElement === 'input' ? disabled : undefined,
            'aria-disabled': disabledOrReadOnly || undefined,
            rel: rootElement === 'a' ? rel : undefined,
          };

    const handleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const renderFocusRing = (): React.ReactNode =>
      !nonInteractive &&
      !disabled &&
      !noFocusRing && (
        <FocusRing
          {...getStyles('focusRing')}
          interactions={stateLayer.interactionsContext.state}
          {...focusRingProps}
        />
      );

    const renderTouchTarget = (): React.ReactNode =>
      !nonInteractive && touchTargetRenderer !== undefined
        ? touchTargetRenderer?.()
        : !disabledOrReadOnly && (
            <TouchTarget
              {...getStyles('touchTarget')}
              interactions={stateLayer.interactionsContext.state}
            />
          );

    const renderStateLayer = (): React.ReactNode =>
      !nonInteractive &&
      !disabled && (
        <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
      );

    return (
      <Paper
        {...getStyles('root')}
        {...attributes}
        ref={handleRef}
        as={rootElement}
        classNames={classNames}
        tabIndex={nonInteractive ? undefined : disabledOrReadOnly ? -1 : 0}
        interactions={stateLayer.interactionsContext.state}
        {...mergeProps(
          stateLayer.interactionsContext.triggerProps,
          { onClick: nonInteractive ? undefined : onClick },
          other,
        )}
      >
        {isFunction(children) ? (
          children({ renderFocusRing, renderStateLayer, renderTouchTarget })
        ) : (
          <>
            {renderFocusRing()}
            {renderStateLayer()}
            {children}
            {renderTouchTarget()}
          </>
        )}
      </Paper>
    );
  },
);

ButtonBase.theme = buttonBaseTheme;
ButtonBase.displayName = `@sixui/${COMPONENT_NAME}`;
