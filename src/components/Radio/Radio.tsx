import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { RadioTheme, RadioThemeVariants } from './Radio.css';

const COMPONENT_NAME = 'Radio';

export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant = 'primary',
    children,
    disabled,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<IRadioThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    theme: RadioTheme,
    themeVariants: RadioThemeVariants,
    variant,
    modifiers: {
      disabled,
    },
  });

  return (
    <ButtonBase
      {...getStyles('root')}
      onClick={() => {}}
      // classNames={mergeClassNames(classNames, {
      //   stateLayer: getStyles('stateLayer').className,
      // })}
      // readOnly={readOnly}
      ref={forwardedRef}
      {...other}
    >
      {children}
    </ButtonBase>
  );
});

Radio.theme = RadioTheme;
Radio.displayName = `@sixui/${COMPONENT_NAME}`;
