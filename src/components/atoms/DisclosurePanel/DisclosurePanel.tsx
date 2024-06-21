import { forwardRef, useContext, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import stylex from '@stylexjs/stylex';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDisclosurePanelStyleKey,
  IDisclosurePanelStyleVarKey,
} from './DisclosurePanel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { DisclosureContext } from '@/components/atoms/Disclosure';
import { useForkRef } from '@/hooks/useForkRef';
import { useElementSize } from '@/hooks/useElementSize';

export type IDisclosureProps = IContainerProps<IDisclosurePanelStyleKey> & {
  children: React.ReactNode;
};

const localStyles = stylex.create({
  height: (height: number) => ({
    height,
    overflow: 'hidden',
  }),
});

export const DisclosurePanel = forwardRef<HTMLDivElement, IDisclosureProps>(
  function DisclosurePanel(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      'data-cy': dataCy = 'disclosure-panel',
      ...other
    } = props;

    const { theme } = useComponentTheme('DisclosurePanel');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<
          IDisclosurePanelStyleKey,
          IDisclosurePanelStyleVarKey
        >(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(DisclosureContext);
    const expanded = context.checkable
      ? context.expanded && context.checked
      : context.expanded;

    const nodeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentSize = useElementSize({
      ref: contentRef,
      expanded,
    });
    const handleRef = useForkRef(nodeRef, forwardedRef);

    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={expanded}
        timeout={1000}
        classNames={{
          enterActive: sxf('animation$onEnterActive').className,
          exitActive: sxf('animation$onExitActive').className,
        }}
        unmountOnExit
      >
        <div
          {...sxf(
            'host',
            localStyles.height(contentSize.height),
            theme.vars,
            sx,
          )}
          data-cy={dataCy}
          {...other}
          ref={handleRef}
        >
          <div {...sxf('content')} ref={contentRef}>
            {children}
          </div>
        </div>
      </CSSTransition>
    );
  },
);
