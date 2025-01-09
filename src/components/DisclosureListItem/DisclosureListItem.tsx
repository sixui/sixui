import { useCallback, useEffect } from 'react';

import type { IDisclosureListItemThemeFactory } from './DisclosureListItem.css';
import type { IDisclosureListItemFactory } from './DisclosureListItem.types';
import { iconChevronDown } from '~/assets/icons';
import { IAny, IMaybeAsync } from '~/helpers/types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { Checkbox } from '../Checkbox';
import { useExpandableContext } from '../Expandable';
import { ListItem } from '../ListItem';
import { SvgIcon } from '../SvgIcon';
import { Switch } from '../Switch';
import { disclosureListItemTheme } from './DisclosureListItem.css';

const COMPONENT_NAME = 'DisclosureListItem';

export const DisclosureListItem = componentFactory<IDisclosureListItemFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked: checkedProp,
      defaultChecked,
      value,
      onChange,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required,
      loading,
      id,
      collapseIcon,
      expandIcon,
      expanded: expandedProp,
      checkable,
      switchable,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const expandableContext = useExpandableContext();
    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });

    const readOnly = readOnlyProp || expandableContext?.readOnly || loading;
    const toggleable = checkable || switchable;
    const disabled =
      disabledProp || expandableContext?.disabled || (toggleable && !checked);
    const expanded = !disabled && (expandedProp || expandableContext?.expanded);

    const { getStyles } = useComponentTheme<IDisclosureListItemThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: disclosureListItemTheme,
      modifiers: {
        disabled,
        expanded,
        checkable,
        switchable,
      },
    });

    const icon = expanded ? (
      (collapseIcon ?? expandIcon) ? (
        <div {...getStyles('icon')}>{collapseIcon ?? expandIcon}</div>
      ) : (
        <SvgIcon {...getStyles('icon')} icon={iconChevronDown} />
      )
    ) : expandIcon ? (
      <div {...getStyles('icon')}>{expandIcon}</div>
    ) : (
      <SvgIcon {...getStyles('icon')} icon={iconChevronDown} />
    );

    useEffect(() => {
      // Panel should be collapsed if DisclosureButton is disabled, or
      // toggleable and not checked.
      if (expandableContext && expanded !== expandableContext.expanded) {
        expandableContext.expand(!!expanded);
      }
    }, [expanded, expandableContext]);

    const handleChange = useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string | undefined,
      ): IMaybeAsync<IAny> => {
        const newChecked = value !== undefined;
        if (newChecked === checked) {
          return;
        }

        return Promise.all([onChange?.(event, value)]).then(() => {
          setChecked(newChecked);
          expandableContext?.expand(newChecked);
        });
      },
      [expandableContext, checked, onChange, setChecked],
    );

    return (
      <Box {...getStyles('root')} {...boxProps} ref={rootRef}>
        <ListItem
          classNames={mergeClassNames(classNames, {
            root: getStyles('listItem').className,
            item: getStyles('item').className,
          })}
          ref={forwardedRef}
          trailingIcon={icon}
          loading={loading}
          disabled={disabled}
          readOnly={readOnly}
          {...forwardedProps}
        />

        {toggleable && (
          <div {...getStyles('toggleContainer')}>
            {switchable ? (
              <Switch
                checked={checked}
                defaultChecked={defaultChecked}
                value={value}
                onChange={handleChange}
                required={required}
                id={id}
              />
            ) : (
              <Checkbox
                checked={checked}
                defaultChecked={defaultChecked}
                value={value}
                onChange={handleChange}
                required={required}
                id={id}
              />
            )}
          </div>
        )}
      </Box>
    );
  },
);

DisclosureListItem.theme = disclosureListItemTheme;
DisclosureListItem.displayName = `@sixui/${COMPONENT_NAME}`;
