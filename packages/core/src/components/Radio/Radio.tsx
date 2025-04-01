import type { ILabeledProps } from '~/components/Labeled';
import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css';
import { COMPONENT_NAME } from './Radio.constants';
import { RadioControl } from './RadioControl';
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
    labelPosition = 'right',
    labeledProps,
    controlProps,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

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
        labelAndActionContainer: getStyles('labelAndActionContainer').className,
      })}
      align="flex-start"
      readOnlyOnLoading
      labelPosition={labelPosition}
      {...labeledProps}
      {...(other as ILabeledProps)}
      forwardForeignProps
    >
      {({ foreignProps, ...labeledControlProps }) => (
        <RadioControl
          ref={forwardedRef}
          {...labeledControlProps}
          {...foreignProps}
          {...controlProps}
        />
      )}
    </Labeled>
  );
});

Radio.displayName = `@sixui/core/${COMPONENT_NAME}`;
Radio.theme = radioTheme;
Radio.Control = RadioControl;
Radio.Indicator = RadioIndicator;
