import { forwardRef, useMemo } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import type { IDisclosureStyleKey } from './Disclosure.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { DisclosureButton } from '@/components/atoms/DisclosureButton';
import { DisclosurePanel } from '@/components/atoms/DisclosurePanel';

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> & {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Disclosure = forwardRef<HTMLDivElement, IDisclosureProps>(
  function Disclosure(props, ref) {
    const { styles, sx, children, defaultOpen, ...other } = props;

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
      <HeadlessDisclosure
        as='div'
        {...other}
        {...sxf('host', sx)}
        ref={ref}
        defaultOpen={defaultOpen}
      >
        {children}
      </HeadlessDisclosure>
    );
  },
);

const DisclosureNamespace = Object.assign(Disclosure, {
  Button: DisclosureButton,
  Panel: DisclosurePanel,
});

export { DisclosureNamespace as Disclosure };
