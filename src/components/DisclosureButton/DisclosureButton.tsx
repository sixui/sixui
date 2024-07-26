import { forwardRef, useContext, useEffect, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IDisclosureButtonProps } from './DisclosureButton.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { ListItem } from '~/components/ListItem';
import { Checkbox } from '~/components/Checkbox';
import { Switch } from '~/components/Switch';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { useControlledValue } from '~/hooks/useControlledValue';
import { ExpandableContext } from '~/components/Expandable';
import { SvgIcon } from '~/components/SvgIcon';
import {
  disclosureButtonCircularProgressIndicatorStyles,
  disclosureButtonItemStyles,
  disclosureButtonStyles,
} from './DisclosureButton.styles';
import { disclosureButtonTheme } from './DisclosureButton.stylex';
import { iconChevronDown } from '~/assets/icons';

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

  const componentTheme = useComponentTheme('DisclosureButton');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(disclosureButtonStyles, styles),
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
      <SvgIcon
        sx={[stylesCombinator('icon'), stylesCombinator('icon$expanded')]}
        icon={iconChevronDown}
      />
    )
  ) : expandIcon ? (
    <div {...sxf('icon', 'icon$collapsed')}>{expandIcon}</div>
  ) : (
    <SvgIcon
      sx={[stylesCombinator('icon'), stylesCombinator('icon$collapsed')]}
      icon={iconChevronDown}
    />
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
    <div
      {...sxf(
        disclosureButtonTheme,
        componentTheme.overridenStyles,
        'host',
        sx,
      )}
    >
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
