import { forwardRef, useMemo, Fragment } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosureButtonStyleKey,
  IDisclosureButtonStyleVarKey,
} from './DisclosureButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> & {
    collapseIcon?: React.ReactNode;
    expandIcon?: React.ReactNode;
    trailing?: boolean;
    children:
      | React.ReactNode
      | ((props: { open: boolean }) => React.ReactElement);
  };

export const DisclosureButton = forwardRef<
  HTMLButtonElement,
  IDisclosureButtonProps
>(function DisclosureButton(props, ref) {
  const { styles, sx, collapseIcon, expandIcon, trailing, children, ...other } =
    props;

  const { theme } = useComponentTheme('DisclosureButton');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IDisclosureButtonStyleKey,
        IDisclosureButtonStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <HeadlessDisclosure.Button as={Fragment}>
      {({ open }) => {
        const icon = open
          ? collapseIcon ??
            (expandIcon ? (
              <div {...sxf('icon$expanded')}>{expandIcon}</div>
            ) : (
              <ChevronDown {...sxf('icon$expanded')} aria-hidden />
            ))
          : expandIcon ?? <ChevronDown aria-hidden />;

        return (
          <ListItem
            {...other}
            ref={ref}
            sx={[
              stylesCombinator('host', open && 'host$expanded'),
              sx,
              theme.vars,
            ]}
            leadingIcon={trailing ? null : icon}
            trailingIcon={trailing ? icon : null}
            type='button'
          >
            {typeof children === 'function' ? children({ open }) : children}
          </ListItem>
        );
      }}
    </HeadlessDisclosure.Button>
  );
});
