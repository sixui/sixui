import { forwardRef, useContext, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
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
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';
import { DisclosureContext } from '@/components/atoms/Disclosure';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> &
    IOmit<Omit<IListItemProps, 'innerStyles'>, 'children'> & {
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
>(function DisclosureButton(props, forwardedRef) {
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

  const context = useContext(DisclosureContext);
  const disabled = disabledProp ?? context.disabled;
  const expanded = context.checkable
    ? context.expanded && context.checked
    : context.expanded;
  const icon = expanded ? (
    collapseIcon ? (
      <div {...sxf('icon')}>{collapseIcon}</div>
    ) : expandIcon ? (
      <div {...sxf('icon', 'icon$expanded')}>{expandIcon}</div>
    ) : (
      <ChevronDown {...sxf('icon', 'icon$expanded')} aria-hidden />
    )
  ) : expandIcon ? (
    <div {...sxf('icon', 'icon$collapsed')}>{expandIcon}</div>
  ) : (
    <ChevronDown {...sxf('icon', 'icon$collapsed')} aria-hidden />
  );

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
        trailing={
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
        data-cy={dataCy}
        {...other}
        {...context.getTriggerProps()}
        ref={forwardedRef}
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
