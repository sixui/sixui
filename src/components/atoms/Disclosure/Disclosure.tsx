import { forwardRef, useMemo } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import type { IDisclosureStyleKey } from './Disclosure.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { DisclosureButton } from '@/components/atoms/DisclosureButton';
import { DisclosurePanel } from '@/components/atoms/DisclosurePanel';
import { useControlled } from '@/hooks/useControlled';
import {
  DisclosureContext,
  type IDisclosureContext,
} from './DisclosureContext';

export type IDisclosureChildrenProps = {
  open?: boolean;
  close: (
    focusableElement?: HTMLElement | React.MutableRefObject<HTMLElement | null>,
  ) => void;
  checked?: boolean;
};

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> &
  IDisclosureContext & {
    children:
      | React.ReactElement
      | ((props: IDisclosureChildrenProps) => React.ReactElement);
    defaultOpen?: boolean;
  };

const Disclosure = forwardRef<HTMLDivElement, IDisclosureProps>(
  function Disclosure(props, ref) {
    const {
      styles,
      sx,
      children,
      defaultOpen,
      checkable,
      defaultChecked,
      checked: checkedProp,
      onChange,
      ...other
    } = props;

    const [checked, setChecked] = useControlled({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: 'Disclosure',
    });

    const { theme } = useComponentTheme('Disclosure');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IDisclosureStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const contextValue = useMemo(
      () =>
        ({
          checkable,
          defaultChecked,
          checked,
          onChange: (event) => {
            setChecked(event.target.checked);
            onChange?.(event, event.target.checked);
          },
        }) satisfies IDisclosureContext,
      [checkable, defaultChecked, checked, setChecked, onChange],
    );

    return (
      <DisclosureContext.Provider value={contextValue}>
        <HeadlessDisclosure
          as='div'
          {...other}
          {...sxf('host', sx)}
          ref={ref}
          defaultOpen={defaultOpen}
        >
          {({ open, close }) =>
            typeof children === 'function'
              ? children({ open, close, checked })
              : children
          }
        </HeadlessDisclosure>
      </DisclosureContext.Provider>
    );
  },
);

const DisclosureNamespace = Object.assign(Disclosure, {
  Button: DisclosureButton,
  Panel: DisclosurePanel,
});

export { DisclosureNamespace as Disclosure };
