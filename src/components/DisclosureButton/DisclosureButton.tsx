import { forwardRef, useContext, useEffect } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IDisclosureButtonProps } from './DisclosureButton.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { iconChevronDown } from '~/assets/icons';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { ListItem } from '../ListItem';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { ExpandableContext } from '../Expandable';
import { SvgIcon } from '../SvgIcon';
import { Base } from '../Base';
import {
  disclosureButtonCircularProgressIndicatorStyles,
  disclosureButtonItemStyles,
  disclosureButtonStyles,
} from './DisclosureButton.styles';
import { disclosureButtonTheme } from './DisclosureButton.stylex';

export const DisclosureButton = createPolymorphicComponent<
  'button',
  IDisclosureButtonProps
>(
  forwardRef<HTMLButtonElement, IDisclosureButtonProps>(
    function DisclosureButton(props, forwardedRef) {
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

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'DisclosureButton',
        styles: [disclosureButtonStyles, styles],
      });

      const expandableContext = useContext(ExpandableContext);
      const disabled = disabledProp ?? expandableContext?.disabled;
      const toggleable = checkable || switchable;
      const [checked, setChecked] = useControlledValue({
        controlled: checkedProp,
        default: !!defaultChecked,
        name: 'DisclosureButton',
      });
      const expanded =
        (expandedProp ?? expandableContext?.expanded) &&
        (!toggleable || checked);
      const icon = expanded ? (
        collapseIcon ? (
          <div {...getStyles('icon')}>{collapseIcon}</div>
        ) : expandIcon ? (
          <div {...getStyles('icon', 'icon$expanded')}>{expandIcon}</div>
        ) : (
          <SvgIcon
            sx={combineStyles('icon', 'icon$expanded')}
            icon={iconChevronDown}
          />
        )
      ) : expandIcon ? (
        <div {...getStyles('icon', 'icon$collapsed')}>{expandIcon}</div>
      ) : (
        <SvgIcon
          sx={combineStyles('icon', 'icon$collapsed')}
          icon={iconChevronDown}
        />
      );

      useEffect(() => {
        // Panel should be collapsed if DisclosureButton is disabled, or toggleable
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
        <Base
          sx={[disclosureButtonTheme, globalStyles, combineStyles('host'), sx]}
        >
          <ListItem
            sx={combineStyles(
              'button',
              expanded && 'button$expanded',
              switchable && 'button$switchable',
              checkable && 'button$checkable',
              toggleable && !checked && 'button$toggledOff',
            )}
            styles={innerStyles?.listItem}
            innerStyles={{
              ...innerStyles,
              item: [disclosureButtonItemStyles, ...asArray(innerStyles?.item)],
            }}
            trailing={
              !toggleable && loading ? (
                <IndeterminateCircularProgressIndicator
                  styles={[
                    disclosureButtonCircularProgressIndicatorStyles,
                    ...asArray(innerStyles?.circularProgressIndicator),
                  ]}
                />
              ) : undefined
            }
            trailingIcon={!toggleable && loading ? undefined : icon}
            data-cy={dataCy}
            disabled={disabled ?? (toggleable && !checked)}
            onClick={(event) => {
              expandableContext?.expand(!expanded);

              return other.onClick?.(event);
            }}
            {...other}
            ref={forwardedRef}
          >
            {children}
          </ListItem>

          {toggleable ? (
            <div {...getStyles('toggleContainer')}>
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
        </Base>
      );
    },
  ),
);
