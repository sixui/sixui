import type { ISwitchThemeFactory } from './Switch.css';
import type { ISwitchFactory, ISwitchProps } from './Switch.types';
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
      requiredSign,
      hasError,
      errorText,
      labelPosition = 'right',
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } =
      extractBoxProps<ISwitchProps>(other);

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
          labelAndActionContainer: getStyles('labelAndActionContainer')
            .className,
        })}
        align="start"
        label={label}
        supportingText={supportingText}
        requiredSign={requiredSign}
        id={other.id}
        required={other.required}
        disabled={other.disabled}
        readOnly={other.readOnly}
        loading={other.loading}
        readOnlyOnLoading
        hasError={hasError}
        errorText={errorText}
        labelPosition={labelPosition}
        {...labeledProps}
        {...boxProps}
      >
        <SwitchControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

Switch.displayName = `@sixui/core/${COMPONENT_NAME}`;
Switch.theme = switchTheme;
Switch.Control = SwitchControl;
Switch.Indicator = SwitchIndicator;
