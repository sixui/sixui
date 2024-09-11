import type { IFieldBaseOutlineFactory } from './FieldBaseOutline.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import {
  fieldBaseOutlineTheme,
  type IFieldBaseOutlineThemeFactory,
} from './FieldBaseOutline.css';

const COMPONENT_NAME = 'FieldBaseOutline';

export const FieldBaseOutline = componentFactory<IFieldBaseOutlineFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'primary',
      children,
      hasLabel,
      hasError,
      populated,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFieldBaseOutlineThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: fieldBaseOutlineTheme,
      variant,
      modifiers: {
        'with-label': hasLabel,
        'with-error': hasError,
        populated,
        disabled,
      },
    });

    return (
      <Box {...other} {...getStyles('root')} ref={forwardedRef}>
        <div {...getStyles(['section$startEnd', 'section$start'])}>
          <div
            {...getStyles([
              'border',
              'border$startEnd',
              'border$start',
              'border$inactive$startEnd',
            ])}
          />
          <div
            {...getStyles([
              'border',
              'border$startEnd',
              'border$start',
              'border$active$startEnd',
            ])}
          />
        </div>
        <div {...getStyles('notch')}>
          <div {...getStyles(['section$panel', 'section$panel$inactive'])}>
            <div
              {...getStyles([
                'border',
                'border$panel',
                'border$inactive$panel',
                'border$inactive$panel$inactive',
              ])}
            />
            <div
              {...getStyles([
                'border',
                'border$panel',
                'border$active$panel',
                'border$active$panel$inactive',
              ])}
            />
          </div>
          <div {...getStyles(['section$panel', 'section$panel$active'])}>
            <div
              {...getStyles([
                'border',
                'border$panel',
                'border$inactive$panel',
                'border$inactive$panel$active',
              ])}
            />
            <div
              {...getStyles([
                'border',
                'border$panel',
                'border$active$panel',
                'border$active$panel$active',
              ])}
            />
          </div>
          <div {...getStyles('label')}>{children}</div>
        </div>
        <div {...getStyles(['section$startEnd', 'section$end'])}>
          <div
            {...getStyles([
              'border',
              'border$startEnd',
              'border$end',
              'border$inactive$startEnd',
            ])}
          />
          <div
            {...getStyles([
              'border',
              'border$startEnd',
              'border$end',
              'border$active$startEnd',
            ])}
          />
        </div>
      </Box>
    );
  },
);

FieldBaseOutline.theme = fieldBaseOutlineTheme;
FieldBaseOutline.displayName = `@sixui/${COMPONENT_NAME}`;
