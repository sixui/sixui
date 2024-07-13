import { forwardRef, useContext, useEffect, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IDisclosureButtonStyleKey,
  IDisclosureButtonStyleVarKey,
} from './DisclosureButton.styledefs';
import type { IDisclosureButtonProps } from './DisclosureButtonProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { ListItem } from '@/components/atoms/ListItem';
import { ReactComponent as ChevronDown } from '@/assets/ChevronDown.svg';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Switch } from '@/components/atoms/Switch';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/IndeterminateCircularProgressIndicator';
import { useControlledValue } from '@/hooks/useControlledValue';
import { ExpandableContext } from '@/components/utils/Expandable';

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

  const { theme, overridenStyles } = useComponentThemeOld('DisclosureButton');
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
    <div {...sxf('host', theme.vars, overridenStyles, sx)}>
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
