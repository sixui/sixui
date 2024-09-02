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
      staticInteractionState,
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
      disabled: disabledOrReadOnly,
      staticInteractionState,
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

    return (
      <Box
        {...other}
        {...getStyles('root')}
        {...attributes}
        as={rootElement}
        interactions={stateLayer.interactions}
        ref={forwardedRef}
        modifiers={{
          disabled: disabledOrReadOnly,
        }}
      >
        <TouchTarget interactionsState={stateLayer.interactions.state} />
        <Elevation disabled={disabledOrReadOnly} />
        <div {...getStyles('outline')} />
        <div {...getStyles('background')} />
        {!disabledOrReadOnly && (
          <FocusRing
            interactionsState={stateLayer.interactions.state}
            variant={inwardFocusRing ? 'inward' : undefined}
          />
        )}
        <StateLayer context={stateLayer} />
        {children}
      </Box>
    );
  },
);
