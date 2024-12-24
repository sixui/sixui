import { useCallback } from 'react';

import type { IButtonBaseThemeFactory } from './ButtonBase.css';
import type { IButtonBaseFactory } from './ButtonBase.types';
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
      focusRing,
      disabled,
      readOnly,
      type = 'button',
      stateLayer: stateLayerProp,
      interactions,
      interactionsMergeStrategy,
      href,
      target,
      rel,
      touchTargetRenderer,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sixuiContext = useSixuiContext();
    const disabledOrReadOnly = disabled || readOnly;
    const isInteractive =
      !!href || other.onClick !== undefined || as === 'input';

    const { getStyles } = useComponentTheme<IButtonBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: buttonBaseTheme,
      variant,
      modifiers: {
        disabled: disabledOrReadOnly,
        interactive: isInteractive,
      },
    });

    const ownStateLayer = useStateLayer<HTMLDivElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: !isInteractive || !!stateLayerProp || disabledOrReadOnly,
    });
    const stateLayer = stateLayerProp ?? ownStateLayer;
    const rootElement =
      as ??
      (isInteractive
        ? href
          ? (sixuiContext.settings?.linkAs ?? 'a')
          : 'button'
        : 'div');

    const attributes = isInteractive
      ? rootElement === 'button'
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
          }
      : {
          'aria-disabled': disabledOrReadOnly || undefined,
        };

    const handleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const renderTouchTarget = useCallback(
      () =>
        touchTargetRenderer !== undefined
          ? touchTargetRenderer()
          : !disabledOrReadOnly && (
              <TouchTarget
                {...getStyles('touchTarget')}
                interactions={stateLayer.interactionsContext.state}
              />
            ),
      [
        disabledOrReadOnly,
        getStyles,
        stateLayer.interactionsContext.state,
        touchTargetRenderer,
      ],
    );

    return (
      <Paper
        {...getStyles('root')}
        {...attributes}
        ref={handleRef}
        as={rootElement}
        classNames={classNames}
        tabIndex={isInteractive ? (disabledOrReadOnly ? -1 : 0) : undefined}
        interactions={stateLayer.interactionsContext.state}
        {...mergeProps(stateLayer.interactionsContext.triggerProps, other)}
      >
        {renderTouchTarget()}
        <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
        {!disabledOrReadOnly && focusRing !== false && (
          <FocusRing
            {...getStyles('focusRing')}
            interactions={stateLayer.interactionsContext.state}
            variant={focusRing}
          />
        )}
        {children}
      </Paper>
    );
  },
);

ButtonBase.theme = buttonBaseTheme;
ButtonBase.displayName = `@sixui/${COMPONENT_NAME}`;
