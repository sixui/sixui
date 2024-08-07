import { forwardRef } from 'react';

import type { IPolymorphicTemplateProps } from './PolymorphicTemplate.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { polymorphicTemplateTheme } from './PolymorphicTemplate.stylex';
import { polymorphicTemplateStyles } from './PolymorphicTemplate.styles';

export const PolymorphicTemplate = createPolymorphicComponent<
  'div',
  IPolymorphicTemplateProps
>(
  forwardRef<HTMLDivElement, IPolymorphicTemplateProps>(
    function PolymorphicTemplate(props, forwardedRef) {
      const { styles, sx, children, ...other } = props;

      const { combineStyles, globalStyles } = useStyles({
        name: 'PolymorphicTemplate',
        styles: [polymorphicTemplateStyles, styles],
      });

      return (
        <Base
          {...other}
          sx={[
            polymorphicTemplateTheme,
            globalStyles,
            combineStyles('host'),
            sx,
          ]}
          ref={forwardedRef}
        >
          {children}
        </Base>
      );
    },
  ),
);
