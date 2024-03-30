import { forwardRef, useMemo } from 'react';
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
    disabled: disabledProp,
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
  const disabled = disabledProp ?? context.disabled;
  const expanded = context.checkable
    ? context.expanded && context.checked
    : context.expanded;
  const icon = expanded
    ? collapseIcon ??
      (expandIcon ? (
        <div {...sxf('icon$expanded')}>{expandIcon}</div>
      ) : (
        <ChevronDown {...sxf('icon$expanded')} aria-hidden />
      ))
    : expandIcon ?? <ChevronDown aria-hidden />;

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ): void => {
    context.onChange?.(event, checked);
    context.setExpanded?.(checked);
  };

  return (
    <div {...sxf('host')}>
      <ListItem
        {...other}
        ref={ref}
        sx={[
          stylesCombinator(
            'button',
            context.expanded && 'button$expanded',
            context.checkable && 'button$checkable',
            context.checkable && !context.checked && 'button$unchecked',
          ),
          sx,
          theme.vars,
        ]}
        innerStyles={{
          item: [theme.itemStyles, ...asArray(innerStyles?.item)],
        }}
        trailingIcon={icon}
        disabled={disabled ?? (context.checkable && !context.checked)}
        onClick={() => context.setExpanded?.(!context.expanded)}
      >
        {children}
      </ListItem>

      {context.checkable ? (
        <div {...sxf('checkboxContainer')}>
          <Checkbox
            defaultChecked={defaultChecked}
            checked={context.checked}
            onChange={handleCheckboxChange}
            disabled={disabled}
          />
        </div>
      ) : undefined}
    </div>
  );
});
