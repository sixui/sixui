import { useMergeRefs } from '@floating-ui/react';
import { mergeProps } from 'react-aria';

import type { IButtonBaseThemeFactory } from './ButtonBase.css';
import type { IButtonBaseFactory } from './ButtonBase.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
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
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const disabledOrReadOnly = disabled || readOnly;

    const sixuiContext = useSixuiContext();
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
      },
    });

    const ownStateLayer = useStateLayer<HTMLDivElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: !!stateLayerProp || disabledOrReadOnly,
    });
    const stateLayer = stateLayerProp ?? ownStateLayer;
    const rootElement =
      as ?? (href ? (sixuiContext.settings?.linkAs ?? 'a') : 'button');

    const attributes =
      rootElement === 'button'
        ? {
            type,
            disabled,
          }
        : {
            role: 'button',
            tabIndex: disabled ? undefined : 0,
            href,
            target: rootElement === 'a' ? target : undefined,
            type: rootElement === 'input' ? type : undefined,
            disabled: rootElement === 'input' ? disabled : undefined,
            'aria-disabled': disabledOrReadOnly || undefined,
            rel: rootElement === 'a' ? rel : undefined,
          };

    const handleRef = useMergeRefs([forwardedRef, stateLayer.triggerRef]);

    return (
      <Paper
        {...getStyles('root')}
        {...attributes}
        ref={handleRef}
        as={rootElement}
        classNames={classNames}
        tabIndex={disabledOrReadOnly ? -1 : 0}
        interactions={stateLayer.interactionsContext.state}
        role="button"
        {...mergeProps(stateLayer.interactionsContext.triggerProps, other)}
      >
        {!disabledOrReadOnly && (
          <TouchTarget
            {...getStyles('touchTarget')}
            interactions={stateLayer.interactionsContext.state}
          />
        )}
        <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
        {!disabled && focusRing !== false && (
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
