import type { ISwitchThemeFactory } from './Switch.css';
import type { ISwitchFactory } from './Switch.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './Switch.constants';
import { SwitchControl } from './SwitchControl';
import { SwitchIndicator } from './SwitchIndicator';
import { switchTheme } from './Switch.css';

/**
 * @see https://m3.material.io/components/switch/overview
 */
export const Switch = componentFactory<ISwitchFactory>(
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

    const { getStyles } = useComponentTheme<ISwitchThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: switchTheme,
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
        <SwitchControl ref={forwardedRef} {...forwardedProps} />
      </Labeled>
    );
  },
);

Switch.theme = switchTheme;
Switch.displayName = `@sixui/core/${COMPONENT_NAME}`;
Switch.Control = SwitchControl;
Switch.Indicator = SwitchIndicator;
