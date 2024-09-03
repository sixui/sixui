import { useMergeRefs } from '@floating-ui/react';

import type { IButtonBaseFactory } from './ButtonBase.types';
import { useProps } from '~/utils/component/useProps';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import { useSixuiContext } from '../SixuiProvider';
import { useStateLayer } from '../StateLayer/useStateLayer';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { TouchTarget } from '../TouchTarget';
import {
  buttonBaseStyles,
  type IButtonBaseStylesFactory,
} from './ButtonBase.css';

const COMPONENT_NAME = 'ButtonBase';

export const ButtonBase = polymorphicComponentFactory<IButtonBaseFactory>(
  (props, forwardedRef) => {
    const {
      as,
      classNames,
      className,
      style,
      variant,
      children,
      inwardFocusRing,
      disabled,
      readOnly,
      type = 'button',
      interactions,
      href,
      target,
      rel,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const sixuiContext = useSixuiContext();
    const { getStyles } = useStyles<IButtonBaseStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: buttonBaseStyles,
      style,
      variant,
    });

    const disabledOrReadOnly = disabled || readOnly;
    const stateLayer = useStateLayer<HTMLDivElement>({
      interactions,
      disabled: disabledOrReadOnly,
    });
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
      <Box
        {...other}
        {...getStyles('root')}
        {...attributes}
        {...stateLayer.interactionsContext.triggerProps}
        ref={handleRef}
        as={rootElement}
        interactions={stateLayer.interactionsContext.state}
      >
        <TouchTarget interactions={stateLayer.interactionsContext.state} />
        <Elevation disabled={disabledOrReadOnly} />
        <div {...getStyles('outline')} />
        <div {...getStyles('background')} />
        {!disabledOrReadOnly && (
          <FocusRing
            interactions={stateLayer.interactionsContext.state}
            variant={inwardFocusRing ? 'inward' : undefined}
          />
        )}
        <StateLayer context={stateLayer} />
        {children}
      </Box>
    );
  },
);
