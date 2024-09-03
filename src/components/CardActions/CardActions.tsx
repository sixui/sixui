import { forwardRef } from 'react';

import type { ICardActionsProps } from './CardActions.types';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { cardActionsStyles } from './CardActions.styles';
import { Stack } from '../Stack';

// TODO: reduce overhead and avoid this component.

export const CardActions = createPolymorphicComponent<'div', ICardActionsProps>(
  forwardRef<HTMLDivElement, ICardActionsProps>(
    function CardActions(props, forwardedRef) {
      const { styles, sx, children, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'CardActions',
        styles: [cardActionsStyles, styles],
      });

      return (
        <Stack
          horizontal
          justify='end'
          gap={2}
          {...other}
          sx={[globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          {children}
        </Stack>
      );
    },
  ),
);
