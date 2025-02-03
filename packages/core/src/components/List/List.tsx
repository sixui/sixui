import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IListThemeFactory } from './List.css';
import type { IListFactory } from './List.types';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './List.constants';
import { ListContextProvider } from './List.context';
import { ListDivider } from './ListDivider';
import { ListItem } from './ListItem';
import { listTheme } from './List.css';

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
    <ListContextProvider value={{ noFocusRing }}>
      <Paper
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('inner')}>
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
        </div>
      </Paper>
    </ListContextProvider>
  );
});

List.theme = listTheme;
List.displayName = `@sixui/core/${COMPONENT_NAME}`;
List.Item = ListItem;
List.Divider = ListDivider;
