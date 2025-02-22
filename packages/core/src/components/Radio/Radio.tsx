import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './Radio.constants';
import { RadioCard } from './RadioCard';
import { RadioControl } from './RadioControl';
import { RadioGroup } from './RadioGroup';
import { RadioIndicator } from './RadioIndicator';
import { radioTheme } from './Radio.css';

/**
 * @see https://m3.material.io/components/radio/overview
 */
export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
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

  const { getStyles } = useComponentTheme<IRadioThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: radioTheme,
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
      <RadioControl ref={forwardedRef} {...forwardedProps} />
    </Labeled>
  );
});

Radio.theme = radioTheme;
Radio.displayName = `@sixui/core/${COMPONENT_NAME}`;
Radio.Control = RadioControl;
Radio.Indicator = RadioIndicator;
Radio.Group = RadioGroup;
Radio.Card = RadioCard;
