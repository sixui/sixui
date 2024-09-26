import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IListThemeFactory } from './List.css';
import type { IListFactory } from './List.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Flex } from '../Flex';
import { Paper } from '../Paper';
import { ListContext } from './List.context';
import { listTheme } from './List.css';

const COMPONENT_NAME = 'List';

export const List = componentFactory<IListFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    noFocusRing,
    children,
    header,
    footer,
    divider,
    cols = 1,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const isGrid = cols > 1;

  const { getStyles } = useComponentTheme<IListThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    theme: listTheme,
    variant,
    modifiers: {
      grid: isGrid,
      empty: !children,
    },
  });

  return (
    <ListContext.Provider value={{ noFocusRing }}>
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        <Flex {...getStyles('inner')} direction="column">
          {header && <header {...getStyles('header')}>{header}</header>}
          <Flex
            {...getStyles('content', {
              style: assignInlineVars({
                [listTheme.tokens.grid.templateColumns]: isGrid
                  ? `repeat(${cols}, 1fr)`
                  : undefined,
              }),
            })}
            direction="column"
            divider={divider}
          >
            {children}
          </Flex>
          {footer && <footer {...getStyles('footer')}>{footer}</footer>}
        </Flex>
      </Paper>
    </ListContext.Provider>
  );
});
