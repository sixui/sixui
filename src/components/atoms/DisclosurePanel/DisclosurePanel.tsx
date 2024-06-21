import { forwardRef, useContext, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosurePanelStyleKey,
  IDisclosurePanelStyleVarKey,
} from './DisclosurePanel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { DisclosureContext } from '@/components/atoms/Disclosure';

export type IDisclosureProps = IContainerProps<IDisclosurePanelStyleKey> & {
  children: React.ReactNode;
};

export const DisclosurePanel = forwardRef<HTMLDivElement, IDisclosureProps>(
  function DisclosurePanel(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      'data-cy': dataCy = 'disclosure-panel',
      ...other
    } = props;

    const { theme } = useComponentTheme('DisclosurePanel');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<
          IDisclosurePanelStyleKey,
          IDisclosurePanelStyleVarKey
        >(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(DisclosureContext);
    const expanded = context.checkable
      ? context.expanded && context.checked
      : context.expanded;

    return (
      <div
        {...other}
        {...sxf('host', expanded ? null : 'host$collapsed', theme.vars, sx)}
        ref={forwardedRef}
        data-cy={dataCy}
      >
        {children}
      </div>
    );
  },
);
