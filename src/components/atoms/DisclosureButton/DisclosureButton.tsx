import { forwardRef, useContext, useEffect, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IDisclosureButtonProps } from './DisclosureButton.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IListItemStylesKey, ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Switch } from '@/components/atoms/Switch';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/IndeterminateCircularProgressIndicator';
import { useControlledValue } from '@/hooks/useControlledValue';
import { ExpandableContext } from '@/components/utils/Expandable';
import {
  disclosureButtonCircularProgressIndicatorStyles,
  disclosureButtonItemStyles,
  disclosureButtonStyles,
  type IDisclosureButtonStylesKey,
} from './DisclosureButton.styles';
import { disclosureButtonTheme } from './DisclosureButton.stylex';

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
    checked: checkedProp,
    defaultChecked,
    onChange,
    loading,
    ...other
  } = props;

  const { overridenStyles } = useComponentTheme('DisclosureButton');
  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IListItemStylesKey | IDisclosureButtonStylesKey>(
        disclosureButtonStyles,
        styles,
      ),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const expandableContext = useContext(ExpandableContext);
  const disabled = disabledProp ?? expandableContext?.disabled;
  const togglable = checkable || switchable;
  const [checked, setChecked] = useControlledValue({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'DisclosureButton',
  });
  const expanded =
    (expandedProp ?? expandableContext?.expanded) && (!togglable || checked);
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
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ): void => {
    const newChecked = value !== undefined;
    if (newChecked === checked) {
      return;
    }

    onChange?.(event, value);
    setChecked(newChecked);
    expandableContext?.expand(newChecked);
  };

  return (
    <div {...sxf(disclosureButtonTheme, overridenStyles, 'host', sx)}>
      <ListItem
        sx={stylesCombinator(
          'button',
          expanded && 'button$expanded',
          switchable && 'button$switchable',
          checkable && 'button$checkable',
          togglable && !checked && 'button$toggledOff',
        )}
        innerStyles={{
          ...innerStyles?.listItem,
          item: [
            disclosureButtonItemStyles,
            ...asArray(innerStyles?.listItem?.item),
          ],
        }}
        trailing={
          !togglable && loading ? (
            <IndeterminateCircularProgressIndicator
              styles={[
                disclosureButtonCircularProgressIndicatorStyles,
                ...asArray(innerStyles?.circularProgressIndicator),
              ]}
            />
          ) : undefined
        }
        trailingIcon={!togglable && loading ? undefined : icon}
        data-cy={dataCy}
        disabled={disabled ?? (togglable && !checked)}
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
              defaultChecked={defaultChecked}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              loading={loading}
              data-cy='disclosure-switch'
            />
          ) : (
            <Checkbox
              styles={innerStyles?.checkbox}
              defaultChecked={defaultChecked}
              checked={checked}
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
