import type { IButtonBaseThemeFactory } from './ButtonBase.css';
import type { IButtonBaseFactory } from './ButtonBase.types';
import { FocusRing } from '~/components/FocusRing';
import { Paper } from '~/components/Paper';
import { useSixuiContext } from '~/components/Sixui';
import { useSortableContext } from '~/components/Sortable/Sortable.context';
import { StateLayer } from '~/components/StateLayer';
import { useStateLayer } from '~/components/StateLayer/useStateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { TouchTarget } from '~/components/TouchTarget';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isFunction } from '~/utils/isFunction';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './ButtonBase.constants';
import { buttonBaseTheme } from './ButtonBase.css';

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
      noFocusRing: noFocusRingProp,
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
      propagateClick: propagateClickProp,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sixuiContext = useSixuiContext();
    const sortableContext = useSortableContext();

    const disabledOrReadOnly = disabled || readOnly;

    // We don't want to show the focus ring when the element is being dragged.
    const noFocusRing = noFocusRingProp ?? sortableContext?.dragging;

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
      propagateClick: propagateClickProp ?? !onClick,
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
      !disabled &&
      !noFocusRing && (
        <FocusRing
          {...getStyles('focusRing')}
          interactions={stateLayer.interactionsContext.state}
          {...focusRingProps}
        />
      );

    const renderTouchTarget = (): React.ReactNode =>
      !nonInteractive &&
      (touchTargetRenderer !== undefined ? (
        touchTargetRenderer?.()
      ) : (
        <TouchTarget
          {...getStyles('touchTarget')}
          interactions={stateLayer.interactionsContext.state}
        />
      ));

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

ButtonBase.displayName = `@sixui/core/${COMPONENT_NAME}`;
ButtonBase.theme = buttonBaseTheme;
