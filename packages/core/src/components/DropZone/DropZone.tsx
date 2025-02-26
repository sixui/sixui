import type { IDropZoneThemeFactory } from './DropZone.css';
import type { IDropZoneFactory } from './DropZone.types';
import { ButtonBase } from '~/components/ButtonBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './DropZone.constants';
import { dropZoneTheme } from './DropZone.css';

export const DropZone = componentFactory<IDropZoneFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      icon,
      label,
      children,
      disabled,
      dropping,
      onClick,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const interactive = !disabled && !dropping && !!onClick;

    const { getStyles } = useComponentTheme<IDropZoneThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dropZoneTheme,
      modifiers: {
        disabled,
        dropping,
        interactive,
      },
    });

    return (
      <ButtonBase
        as="button"
        {...getStyles('root')}
        ref={forwardedRef}
        nonInteractive={!interactive}
        variant="text"
        disabled={disabled}
        onClick={onClick}
        {...other}
      >
        {icon && <div {...getStyles('icon')}>{icon}</div>}
        {label && <div {...getStyles('label')}>{label}</div>}
        {typeof children === 'function' ? children({ dropping }) : children}
      </ButtonBase>
    );
  },
);

DropZone.theme = dropZoneTheme;
DropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
