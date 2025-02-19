import type { IRichTooltipContentThemeFactory } from './RichTooltipContent.css';
import type { IRichTooltipContentFactory } from './RichTooltipContent.types';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './RichTooltipContent.constants';
import { richTooltipContentTheme } from './RichTooltipContent.css';

/**
 * @see https://m3.material.io/components/tooltips/overview
 */
export const RichTooltipContent = componentFactory<IRichTooltipContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      subhead,
      supportingText,
      actions,
      renderCursor,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IRichTooltipContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: richTooltipContentTheme,
      modifiers: {
        'with-actions': !!actions,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <Flex direction="column">
          {renderCursor?.(getStyles('cursor'))}
          <Flex {...getStyles('content')} direction="column" gap="$2">
            {subhead && <div {...getStyles('subhead')}>{subhead}</div>}
            {supportingText && (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            )}
          </Flex>
          {actions && (
            <Flex
              {...getStyles('actions')}
              direction="row"
              gap="$2"
              wrap="wrap"
            >
              {isFunction(actions) ? actions({ onClose }) : actions}
            </Flex>
          )}
        </Flex>
      </Paper>
    );
  },
);

RichTooltipContent.theme = richTooltipContentTheme;
RichTooltipContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
