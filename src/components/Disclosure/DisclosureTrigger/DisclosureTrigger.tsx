import { useCallback, useEffect } from 'react';

import type { IDisclosureTriggerThemeFactory } from './DisclosureTrigger.css';
import type { IDisclosureTriggerFactory } from './DisclosureTrigger.types';
import { iconChevronDown } from '~/assets/icons';
import { Box } from '~/components/Box';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Checkbox } from '~/components/Checkbox';
import { useExpandableContext } from '~/components/Expandable';
import { ListItem } from '~/components/List/ListItem';
import { SvgIcon } from '~/components/SvgIcon';
import { Switch } from '~/components/Switch';
import { useControlledValue } from '~/hooks/useControlledValue';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { disclosureTriggerTheme } from './DisclosureTrigger.css';

const COMPONENT_NAME = 'DisclosureTrigger';

export const DisclosureTrigger = componentFactory<IDisclosureTriggerFactory>(
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
      onClick,
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

    const { getStyles } = useComponentTheme<IDisclosureTriggerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: disclosureTriggerTheme,
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
      async (value: string | undefined): Promise<void> => {
        const newChecked = value !== undefined;
        if (newChecked === checked) {
          return;
        }

        await onChange?.(value);

        setChecked(newChecked);
        expandableContext?.expand(newChecked);
      },
      [expandableContext, checked, onChange, setChecked],
    );

    const handleClick = useCallback(
      async (event: React.MouseEvent<Element>): Promise<void> => {
        await onClick?.(event);
        expandableContext?.expand(!expanded);
      },
      [expandableContext, expanded, onClick],
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
          onClick={handleClick}
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

DisclosureTrigger.theme = disclosureTriggerTheme;
DisclosureTrigger.displayName = `@sixui/${COMPONENT_NAME}`;
