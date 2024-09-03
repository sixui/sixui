import { forwardRef } from 'react';

import type { IDisclosureProps } from './Disclosure.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { useStyles } from '~/hooks/useStyles';
import { Expandable } from '../Expandable';
import { Base } from '../Base';
import { disclosureStyles } from './Disclosure.styles';
import { disclosureTheme } from './Disclosure.stylex';

export const Disclosure = createPolymorphicComponent<'div', IDisclosureProps>(
  forwardRef<HTMLDivElement, IDisclosureProps>(
    function Disclosure(props, forwardedRef) {
      const {
        styles,
        sx,
        trigger,
        children,
        disabled,
        expanded,
        defaultExpanded,
        initiallyExpanded,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        componentName: 'Disclosure',
        styles: [disclosureStyles, styles],
      });

      return (
        <Base
          {...other}
          sx={[disclosureTheme, globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          <Expandable
            trigger={trigger}
            disabled={disabled}
            expanded={expanded}
            defaultExpanded={defaultExpanded}
            initiallyExpanded={initiallyExpanded}
          >
            <div {...getStyles('panel')}>{children}</div>
          </Expandable>
        </Base>
      );
    },
  ),
);
