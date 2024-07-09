import { forwardRef, useMemo } from 'react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IDisclosureStyleKey } from './Disclosure.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  Expandable,
  type IExpandableContextValue,
  type IExpandableProps,
} from '@/components/utils/Expandable';

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> &
  IOmit<IExpandableContextValue, 'expand'> &
  Pick<IExpandableProps, 'trigger' | 'children'>;

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
