import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '@/helpers/types';
import type {
  IDisclosureButtonStyleKey,
  IDisclosureButtonStyleVarKey,
} from './DisclosureButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ListItem, type IListItemProps } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { Checkbox, type ICheckboxStyleKey } from '@/components/atoms/Checkbox';
import { Switch, type ISwitchStyleKey } from '@/components/atoms/Switch';
import { useDisclosureContext } from '@/components/atoms/Disclosure/useDisclosureContext';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> &
    Omit<IListItemProps, 'children' | 'innerStyles'> & {
      innerStyles?: {
        listItem?: IListItemProps['innerStyles'];
        checkbox?: IZeroOrMore<ICompiledStyles<ICheckboxStyleKey>>;
        switch?: IZeroOrMore<ICompiledStyles<ISwitchStyleKey>>;
        circularProgressIndicator?: IZeroOrMore<
          ICompiledStyles<ICircularProgressIndicatorStyleKey>
        >;
      };
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
    'data-cy': dataCy = 'disclosure-button',
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
            context.checkable &&
              (context.withSwitch
                ? 'button$checkable$switch'
                : 'button$checkable'),
            context.checkable && !context.checked && 'button$unchecked',
          ),
          sx,
          theme.vars,
        ]}
        innerStyles={{
          ...innerStyles?.listItem,
          item: [theme.itemStyles, ...asArray(innerStyles?.listItem?.item)],
        }}
        end={
          !context.checkable && context.loading ? (
            <IndeterminateCircularProgressIndicator
              styles={[
                theme.circularProgressIndicatorStyles,
                ...asArray(innerStyles?.circularProgressIndicator),
              ]}
            />
          ) : undefined
        }
        trailingIcon={!context.checkable && context.loading ? undefined : icon}
        disabled={disabled ?? (context.checkable && !context.checked)}
        onClick={() => context.setExpanded?.(!context.expanded)}
        data-cy={dataCy}
      >
        {children}
      </ListItem>

      {context.checkable ? (
        <div {...sxf('checkboxContainer')}>
          {context.withSwitch ? (
            <Switch
              styles={innerStyles?.switch}
              defaultChecked={defaultChecked}
              checked={context.checked}
              onChange={handleCheckboxChange}
              disabled={disabled}
              loading={context.loading}
              data-cy='disclosure-switch'
            />
          ) : (
            <Checkbox
              styles={innerStyles?.checkbox}
              defaultChecked={defaultChecked}
              checked={context.checked}
              onChange={handleCheckboxChange}
              disabled={disabled}
              loading={context.loading}
              data-cy='disclosure-checkbox'
            />
          )}
        </div>
      ) : null}
    </div>
  );
});
