import type { ILabeledProps } from '~/components/Labeled';
import type { ICheckboxThemeFactory } from './Checkbox.css';
import type { ICheckboxFactory } from './Checkbox.types';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './Checkbox.constants';
import { CheckboxControl } from './CheckboxControl';
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
      labelPosition = 'right',
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

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
          labelAndActionContainer: getStyles('labelAndActionContainer')
            .className,
        })}
        align="start"
        readOnlyOnLoading
        labelPosition={labelPosition}
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {({ foreignProps, ...labeledControlProps }) => (
          <CheckboxControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...foreignProps}
            {...controlProps}
          />
        )}
      </Labeled>
    );
  },
);

Checkbox.displayName = `@sixui/core/${COMPONENT_NAME}`;
Checkbox.theme = checkboxTheme;
Checkbox.Control = CheckboxControl;
Checkbox.Indicator = CheckboxIndicator;
