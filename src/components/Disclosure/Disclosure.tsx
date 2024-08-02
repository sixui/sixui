import { forwardRef, useMemo } from 'react';
import stylex from '@stylexjs/stylex';

import type { IDisclosureProps } from './Disclosure.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Expandable } from '~/components/Expandable';
import { disclosureStyles } from './Disclosure.styles';
import { disclosureTheme } from './Disclosure.stylex';

export const Disclosure = forwardRef<HTMLDivElement, IDisclosureProps>(
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

    const componentTheme = useComponentTheme('Disclosure');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(disclosureStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(disclosureTheme, componentTheme.overridenStyles, 'host', sx)}
        {...other}
        ref={forwardedRef}
      >
        <Expandable
          trigger={trigger}
          disabled={disabled}
          expanded={expanded}
          defaultExpanded={defaultExpanded}
          initiallyExpanded={initiallyExpanded}
        >
          <div {...stylex.props(stylesCombinator('panel'))}>{children}</div>
        </Expandable>
      </div>
    );
  },
);
