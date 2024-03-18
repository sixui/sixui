import { forwardRef, useMemo, Fragment } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosureStyleKey,
  IDisclosureStyleVarKey,
} from './Disclosure.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { ReactComponent as ChevronUp } from '@/assets/ChevronUp.svg';

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> & {
  children?: React.ReactNode;
  disclosedIcon?: React.ReactNode;
  concealedIcon?: React.ReactNode;
  defaultOpen?: boolean;
};

export const Disclosure = forwardRef<HTMLDivElement, IDisclosureProps>(
  function Disclosure(props, ref) {
    const {
      styles,
      sx,
      children,
      disclosedIcon,
      concealedIcon,
      defaultOpen,
      ...other
    } = props;

    const { theme } = useComponentTheme('Disclosure');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IDisclosureStyleKey, IDisclosureStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <HeadlessDisclosure
        as='div'
        {...sxf('host', theme.vars, sx)}
        ref={ref}
        defaultOpen={defaultOpen}
        {...other}
      >
        {({ open }) => (
          <>
            <HeadlessDisclosure.Button as={Fragment}>
              <ListItem
                sx={stylesCombinator('button')}
                leadingIcon={
                  open
                    ? disclosedIcon ?? <ChevronUp aria-hidden />
                    : concealedIcon ?? <ChevronDown aria-hidden />
                }
                type='button'
              >
                Advanced options
              </ListItem>
            </HeadlessDisclosure.Button>
            <HeadlessDisclosure.Panel as={Fragment}>
              <div {...sxf('panel')}>
                {children}
                Yes! You can purchase a license that you can share with your
                entire team.
              </div>
            </HeadlessDisclosure.Panel>
          </>
        )}
      </HeadlessDisclosure>
    );
  },
);
