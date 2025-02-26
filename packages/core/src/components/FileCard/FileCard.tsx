import type { IFileCardThemeFactory } from './FileCard.css';
import type { IFileCardFactory } from './FileCard.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileCard.constants';
import { fileCardTheme } from './FileCard.css';

export const FileCard = componentFactory<IFileCardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFileCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileCardTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('label')}>{children}</div>
      </Paper>
    );
  },
);

FileCard.theme = fileCardTheme;
FileCard.displayName = `@sixui/core/${COMPONENT_NAME}`;
