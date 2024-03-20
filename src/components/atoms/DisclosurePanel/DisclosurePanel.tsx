import { forwardRef, useMemo } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosurePanelStyleKey,
  IDisclosurePanelStyleVarKey,
} from './DisclosurePanel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IDisclosureProps = IContainerProps<IDisclosurePanelStyleKey> & {
  children:
    | React.ReactNode
    | ((props: { open: boolean }) => React.ReactElement);
};

export const DisclosurePanel = forwardRef<HTMLDivElement, IDisclosureProps>(
  function DisclosurePanel(props, ref) {
    const { styles, sx, children, ...other } = props;

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

    return (
      <HeadlessDisclosure.Panel
        {...other}
        ref={ref}
        as='div'
        {...sxf('host', theme.vars, sx)}
      >
        {typeof children === 'function'
          ? ({ open }) => children({ open })
          : children}
      </HeadlessDisclosure.Panel>
    );
  },
);
