import { forwardRef, useContext, useEffect, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IAny,
  ICompiledStyles,
  IContainerProps,
  IMaybeAsync,
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
import { ListItem, type IListItemOwnProps } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { Checkbox, type ICheckboxStyleKey } from '@/components/atoms/Checkbox';
import { Switch, type ISwitchStyleKey } from '@/components/atoms/Switch';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';
import { useControlledValue } from '@/hooks/useControlledValue';
import { ExpandableContext } from '@/components/utils/Expandable';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> &
    IOmit<IListItemOwnProps, 'innerStyles'> & {
      innerStyles?: {
        listItem?: IListItemOwnProps['innerStyles'];
        checkbox?: IZeroOrMore<ICompiledStyles<ICheckboxStyleKey>>;
        switch?: IZeroOrMore<ICompiledStyles<ISwitchStyleKey>>;
        circularProgressIndicator?: IZeroOrMore<
          ICompiledStyles<ICircularProgressIndicatorStyleKey>
        >;
      };
      collapseIcon?: React.ReactNode;
      expandIcon?: React.ReactNode;
      expanded?: boolean;
      checkable?: boolean;
      onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
      ) => IMaybeAsync<IAny>;
      value?: boolean;
      defaultValue?: boolean;
      loading?: boolean;
      switchable?: boolean;
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
    disabled: disabledProp,
    'data-cy': dataCy = 'disclosure-button',
    expanded: expandedProp,
    checkable,
    switchable,
    value: valueProp,
    defaultValue,
    onChange,
    loading,
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

  const expandableContext = useContext(ExpandableContext);
  const disabled = disabledProp ?? expandableContext?.disabled;
  const togglable = checkable || switchable;
  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: !!defaultValue,
    name: 'DisclosureButton',
  });
  const expanded =
    (expandedProp ?? expandableContext?.expanded) && (!togglable || value);
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

  useEffect(() => {
    // Panel should be collapsed if DisclosureButton is disabled, or togglable
    // and not checked.
    if (expandableContext && expanded !== expandableContext.expanded) {
      expandableContext.expand(!!expanded);
    }
  }, [expanded, expandableContext]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: boolean,
  ): void => {
    if (newValue === value) {
      return;
    }

    onChange?.(event, newValue);
    setValue(newValue);
    expandableContext?.expand(newValue);
  };

  return (
    <div {...sxf('host', sx, theme.vars)}>
      <ListItem
        sx={stylesCombinator(
          'button',
          expanded && 'button$expanded',
          switchable && 'button$switchable',
          checkable && 'button$checkable',
          togglable && !value && 'button$toggledOff',
        )}
        innerStyles={{
          ...innerStyles?.listItem,
          item: [theme.itemStyles, ...asArray(innerStyles?.listItem?.item)],
        }}
        trailing={
          !togglable && loading ? (
            <IndeterminateCircularProgressIndicator
              styles={[
                theme.circularProgressIndicatorStyles,
                ...asArray(innerStyles?.circularProgressIndicator),
              ]}
            />
          ) : undefined
        }
        trailingIcon={!togglable && loading ? undefined : icon}
        data-cy={dataCy}
        disabled={disabled ?? (togglable && !value)}
        onClick={(event) => {
          expandableContext?.expand(!expanded);

          return other.onClick?.(event);
        }}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </ListItem>

      {togglable ? (
        <div {...sxf('toggleContainer')}>
          {switchable ? (
            <Switch
              styles={innerStyles?.switch}
              defaultChecked={defaultValue}
              checked={value}
              onChange={handleChange}
              disabled={disabled}
              loading={loading}
              data-cy='disclosure-switch'
            />
          ) : (
            <Checkbox
              styles={innerStyles?.checkbox}
              defaultChecked={defaultValue}
              checked={value}
              onChange={handleChange}
              disabled={disabled}
              loading={loading}
              data-cy='disclosure-checkbox'
            />
          )}
        </div>
      ) : null}
    </div>
  );
});
