import { forwardRef } from 'react';

import type { IBasicTemplateProps } from './BasicTemplate.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { basicTemplateStyles } from './BasicTemplate.styles';

export const BasicTemplate = forwardRef<HTMLDivElement, IBasicTemplateProps>(
  function BasicTemplate(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'BasicTemplate',
      styles: [basicTemplateStyles, styles],
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
);
