import type { IRichTooltipContentThemeFactory } from './RichTooltipContent.css';
import type { IRichTooltipContentFactory } from './RichTooltipContent.types';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Flex } from '../Flex';
import { Paper } from '../Paper';
import { richTooltipContentTheme } from './RichTooltipContent.css';

const COMPONENT_NAME = 'RichTooltipContent';

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
      <Paper
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      >
        <Flex direction="column">
          {renderCursor?.(getStyles('cursor'))}
          <Flex {...getStyles('content')} direction="column" gap="$2">
            {subhead ? <div {...getStyles('subhead')}>{subhead}</div> : null}
            {supportingText ? (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            ) : null}
          </Flex>
          {actions ? (
            <Flex
              {...getStyles('actions')}
              direction="row"
              gap="$2"
              wrap="wrap"
            >
              {isFunction(actions) ? actions({ onClose }) : actions}
            </Flex>
          ) : null}
        </Flex>
      </Paper>
    );
  },
);

RichTooltipContent.theme = richTooltipContentTheme;
RichTooltipContent.displayName = `@sixui/${COMPONENT_NAME}`;
