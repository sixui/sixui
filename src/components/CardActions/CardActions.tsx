import { forwardRef } from 'react';

import type { ICardActionsProps } from './CardActions.types';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { cardActionsStyles } from './CardActions.styles';
import { Base } from '../Base';

// TODO: reduce overhead and avoid this component.

export const CardActions = createPolymorphicComponent<'div', ICardActionsProps>(
  forwardRef<HTMLDivElement, ICardActionsProps>(
    function CardActions(props, forwardedRef) {
      const { styles, sx, children, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        name: 'CardActions',
        styles: [cardActionsStyles, styles],
      });

      return (
        <Base
          {...other}
          sx={[globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          {children}
        </Base>
      );
    },
  ),
);
