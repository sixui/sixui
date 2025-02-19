import type { ICheckboxThemeFactory } from './Checkbox.css';
import type { ICheckboxFactory } from './Checkbox.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './Checkbox.constants';
import { CheckboxCard } from './CheckboxCard';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxIndicator } from './CheckboxIndicator';
import { checkboxTheme } from './Checkbox.css';

/**
 * @see https://m3.material.io/components/checkbox/overview
 */
export const Checkbox = componentFactory<ICheckboxFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      supportingText,
      hasError,
      errorText,
      requiredSign,
      labelPosition = 'right',
      labeledProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const { getStyles } = useComponentTheme<ICheckboxThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxTheme,
    });

    return (
      <Labeled
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          content: getStyles('content').className,
        })}
        label={label}
        supportingText={supportingText}
        hasError={hasError}
        errorText={errorText}
        requiredSign={requiredSign}
        labelPosition={labelPosition}
        loading={other.loading}
        id={other.id}
        required={other.required}
        disabled={other.disabled}
        readOnly={other.readOnly}
        {...boxProps}
        {...labeledProps}
      >
        <CheckboxControl ref={forwardedRef} {...forwardedProps} />
      </Labeled>
    );
  },
);

Checkbox.theme = checkboxTheme;
Checkbox.displayName = `@sixui/core/${COMPONENT_NAME}`;
Checkbox.Control = CheckboxControl;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Group = CheckboxGroup;
Checkbox.Card = CheckboxCard;
