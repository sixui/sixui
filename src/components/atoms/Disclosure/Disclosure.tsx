import { forwardRef, useEffect, useMemo, useState } from 'react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IDisclosureStyleKey } from './Disclosure.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { DisclosureButton } from '@/components/atoms/DisclosureButton';
import { DisclosurePanel } from '@/components/atoms/DisclosurePanel';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  DisclosureContext,
  type IDisclosureContextValue,
} from './DisclosureContext';

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> &
  IOmit<IDisclosureContextValue, 'expanded' | 'setExpanded'> & {
    children: React.ReactNode;
    defaultExpanded?: boolean;
  };

const Disclosure = forwardRef<HTMLDivElement, IDisclosureProps>(
  function Disclosure(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      defaultExpanded,
      checkable,
      defaultChecked,
      checked: checkedProp,
      onChange,
      disabled,
      withSwitch,
      loading,
      ...other
    } = props;

    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: 'Disclosure',
    });
    const [expanded, setExpanded] = useState(defaultExpanded || defaultChecked);

    useEffect(() => {
      if (defaultExpanded || defaultChecked) {
        setExpanded(true);
      }
    }, [defaultExpanded, defaultChecked]);

    const { theme } = useComponentTheme('Disclosure');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IDisclosureStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

    const context: IDisclosureContextValue = {
      checkable,
      defaultChecked,
      checked,
      onChange: (event) => {
        setChecked(event.target.checked);
        onChange?.(event, event.target.checked);
      },
      disabled,
      expanded,
      setExpanded,
      withSwitch,
      loading,
    };

    return (
      <DisclosureContext.Provider value={context}>
        <div {...other} {...sxf('host', sx)} ref={forwardedRef}>
          {children}
        </div>
      </DisclosureContext.Provider>
    );
  },
);

const DisclosureNamespace = Object.assign(Disclosure, {
  Button: DisclosureButton,
  Panel: DisclosurePanel,
});

export { DisclosureNamespace as Disclosure };
