import { forwardRef, useMemo, Fragment } from 'react';
import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosureButtonStyleKey,
  IDisclosureButtonStyleVarKey,
} from './DisclosureButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IListItemProps, ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useDisclosureContext } from '@/components/atoms/Disclosure/useDisclosureContext';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> &
    Omit<IListItemProps, 'children'> & {
      collapseIcon?: React.ReactNode;
      expandIcon?: React.ReactNode;
      children: React.ReactNode;
    };

export const DisclosureButton = forwardRef<
  HTMLButtonElement,
  IDisclosureButtonProps
>(function DisclosureButton(props, ref) {
  const {
    styles,
    sx,
    innerStyles,
    collapseIcon,
    expandIcon,
    children,
    defaultChecked,
    ...other
  } = props;

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

  const context = useDisclosureContext();

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
            innerStyles={{
              item: [theme.itemStyles, ...asArray(innerStyles?.item)],
            }}
            start={
              context?.checkable ? (
                <Checkbox
                  defaultChecked={defaultChecked}
                  checked={context.checked}
                  onChange={context.onChange}
                />
              ) : undefined
            }
            trailingIcon={icon}
          >
            {children}
          </ListItem>
        );
      }}
    </HeadlessDisclosure.Button>
  );
});
