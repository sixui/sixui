import type { ISwitchIndicatorThemeFactory } from './SwitchIndicator.css';
import type { ISwitchIndicatorFactory } from './SwitchIndicator.types';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { PaperBase } from '../PaperBase';
import { SvgIcon } from '../SvgIcon';
import { basicTemplateTheme } from './SwitchIndicator.css';

const COMPONENT_NAME = 'SwitchIndicator';

export const SwitchIndicator = componentFactory<ISwitchIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked,
      disabled: disabledProp,
      loading,
      checkedIcon,
      uncheckedIcon,
      alwaysOn,
      stateLayer,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hasIcon =
      loading || (checked && !!checkedIcon) || (!checked && !!uncheckedIcon);
    const isOn = checked || alwaysOn;
    const disabled = disabledProp || loading;

    const { getStyles } = useComponentTheme<ISwitchIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: basicTemplateTheme,
      modifiers: {
        disabled,
        checked,
        'with-icon': hasIcon,
        loading,
        on: isOn,
      },
    });

    return (
      <PaperBase
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('track')}>
          <div {...getStyles('handleContainer')}>
            {stateLayer}

            <PaperBase {...getStyles('handle')}>
              <div {...getStyles(['icon', 'icon$checked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator
                    {...getStyles('progressIndicator')}
                  />
                ) : checkedIcon === true ? (
                  <SvgIcon icon={iconCheckMark} />
                ) : (
                  checkedIcon
                )}
              </div>

              <div {...getStyles(['icon', 'icon$unchecked'])}>
                {loading ? (
                  <IndeterminateCircularProgressIndicator
                    {...getStyles('progressIndicator')}
                  />
                ) : uncheckedIcon === true ? (
                  <SvgIcon icon={iconXMark} />
                ) : (
                  uncheckedIcon
                )}
              </div>
            </PaperBase>
          </div>
        </div>
      </PaperBase>
    );
  },
);

SwitchIndicator.theme = basicTemplateTheme;
SwitchIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
