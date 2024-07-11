import { forwardRef, useMemo } from 'react';

import type { IDisclosureStyleKey } from './Disclosure.styledefs';
import type { IDisclosureProps } from './DisclosureProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Expandable } from '@/components/utils/Expandable';

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

    const { theme } = useComponentTheme('Disclosure');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IDisclosureStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', sx, theme.vars)} {...other} ref={forwardedRef}>
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
