import { forwardRef, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ICardProps } from './Card.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { cardVariantStyles } from './variants';
import {
  cardElevationStyles,
  cardFocusRingStyles,
  cardStateLayerStyles,
  cardStyles,
} from './Card.styles';
import { cardTheme } from './Card.stylex';
import { CardContext, type ICardContextValue } from './Card.context';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

export const Card = createPolymorphicComponent<'div', ICardProps>(
  forwardRef<HTMLDivElement, ICardProps>(function Badge(props, forwardedRef) {
    const {
      as,
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      variant = 'filled',
      children,
      onClick,
      href,
      disabled,
      ...other
    } = props as IWithAsProp<ICardProps>;

    const { visualState, setRef: setVisualStateRef } = useVisualState(
      visualStateProp,
      { disabled },
    );

    const visualStateRef = useRef<HTMLElement>(null);
    const handleRef = useMergeRefs([
      forwardedRef,
      setVisualStateRef,
      visualStateRef,
    ]);

    const variantStyles = variant ? cardVariantStyles[variant] : undefined;
    const { combineStyles, getStyles, globalStyles, settings } = useStyles({
      name: 'Card',
      styles: [cardStyles, variantStyles, styles],
      visualState,
    });

    const actionable = !disabled && (!!href || !!onClick);
    const dragged = visualState?.dragged;

    const hasOutline =
      !!cardStyles.outline ||
      !!variantStyles?.outline ||
      asArray(styles).some((styles) => !!styles?.outline);

    const rootElement =
      as ?? (!dragged && href ? (settings?.linkAs ?? 'a') : 'div');

    const context: ICardContextValue = {
      actionable,
    };

    return (
      <CardContext.Provider value={context}>
        <Base
          as={rootElement}
          href={actionable && !dragged ? href : undefined}
          onClick={actionable && !dragged ? onClick : undefined}
          onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
            // if Enter or Space, trigger onClick
            if (
              actionable &&
              !dragged &&
              (event.key === 'Enter' || event.key === ' ')
            ) {
              event.preventDefault();
              onClick?.();
            }
            // actionable && !dragged ? onClick : undefined;
          }}
          role={actionable ? 'button' : undefined}
          tabIndex={disabled || !actionable ? -1 : 0}
          disabled={disabled}
          {...other}
          visualState={visualState}
          sx={[
            cardTheme,
            globalStyles,
            combineStyles(
              'host',
              actionable && 'host$actionable',
              disabled && 'host$disabled',
            ),
            sx,
          ]}
          ref={handleRef}
        >
          <Elevation
            styles={[cardElevationStyles, ...asArray(innerStyles?.elevation)]}
            disabled={disabled}
          />
          {actionable ? (
            <>
              <StateLayer
                styles={[
                  cardStateLayerStyles,
                  ...asArray(innerStyles?.stateLayer),
                ]}
                for={visualStateRef}
                disabled={disabled}
                visualState={visualState}
              />
              <FocusRing
                styles={[
                  cardFocusRingStyles,
                  ...asArray(innerStyles?.focusRing),
                ]}
                for={visualStateRef}
                visualState={visualState}
              />
            </>
          ) : null}
          {hasOutline ? (
            <div {...getStyles('outline', disabled && 'outline$disabled')} />
          ) : null}
          <div
            {...getStyles('background', disabled && 'background$disabled')}
          />
          {children}
        </Base>
      </CardContext.Provider>
    );
  }),
);
