import type { IStandardSideSheetThemeFactory } from './StandardSideSheet.css';
import type { IStandardSideSheetFactory } from './StandardSideSheet.types';
import { SideSheetContent } from '~/components/SideSheet/SideSheetContent';
import { StandardAside } from '~/components/StandardAside';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { extractDataProps } from '~/utils/extractDataProps';
import { COMPONENT_NAME } from './StandardSideSheet.constants';
import { standardSideSheetTheme } from './StandardSideSheet.css';

export const StandardSideSheet = componentFactory<IStandardSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      divider = true,
      side = 'left',
      wide,
      onClose,
      onClosed,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { dataProps, other: otherExceptDataProps } = extractDataProps(other);

    const { getStyles } = useComponentTheme<IStandardSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: standardSideSheetTheme,
    });

    return (
      <StandardAside
        {...getStyles('root')}
        {...dataProps}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        opened={opened}
        side={side}
        wide={wide}
        onClose={onClose}
        onClosed={onClosed}
        ref={forwardedRef}
      >
        <SideSheetContent
          side={side}
          onClose={onClose}
          divider={divider}
          {...getStyles('sideSheetContent')}
          {...otherExceptDataProps}
        />
      </StandardAside>
    );
  },
);

StandardSideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
StandardSideSheet.theme = standardSideSheetTheme;
