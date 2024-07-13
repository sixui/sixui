import { forwardRef, useMemo } from 'react';

import type { IDisclosureProps } from './Disclosure.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Expandable } from '@/components/utils/Expandable';
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

    const { overridenStyles } = useComponentTheme('Disclosure');
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
        {...sxf(disclosureTheme, overridenStyles, 'host', sx)}
        {...other}
        ref={forwardedRef}
      >
        <Expandable
          trigger={trigger}
          sx={stylesCombinator('panel')}
          disabled={disabled}
          expanded={expanded}
          defaultExpanded={defaultExpanded}
          initiallyExpanded={initiallyExpanded}
        >
          {children}
        </Expandable>
      </div>
    );
  },
);
