import { useMergeRefs } from '@floating-ui/react';

import type { IButtonBaseFactory } from './ButtonBase.types';
import { useProps } from '~/utils/component/useProps';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { useSixuiContext } from '../SixuiProvider';
import { useStateLayer } from '../StateLayer/useStateLayer';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { TouchTarget } from '../TouchTarget';
import {
  buttonBaseTheme,
  type IButtonBaseThemeFactory,
} from './ButtonBase.css';

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
      inwardFocusRing,
      disabled,
      readOnly,
      type = 'button',
      stateLayer: stateLayerProp,
      interactions,
      onPress,
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
      interactions,
      disabled: !!stateLayerProp || disabledOrReadOnly,
      pressEvents: { onPress },
    });
    const hasOwnStateLayer = !!stateLayerProp;
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
            tabIndex: disabled ? undefined : readOnly ? -1 : 0,
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
        {...other}
        {...getStyles('root')}
        {...attributes}
        {...stateLayer.interactionsContext.triggerProps}
        ref={handleRef}
        as={rootElement}
        classNames={classNames}
        interactions={stateLayer.interactionsContext.state}
      >
        {!disabledOrReadOnly && (
          <TouchTarget
            {...getStyles('touchTarget')}
            interactions={stateLayer.interactionsContext.state}
          />
        )}
        <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
        {!disabled && (
          <FocusRing
            {...getStyles('focusRing')}
            interactions={stateLayer.interactionsContext.state}
            variant={inwardFocusRing ? 'inward' : undefined}
          />
        )}
        {children}
      </Paper>
    );
  },
);

ButtonBase.theme = buttonBaseTheme;
ButtonBase.displayName = `@sixui/${COMPONENT_NAME}`;
