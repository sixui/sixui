import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IScrimStyleKey, IScrimStyleVarKey } from './Scrim.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Fade } from '@/components/utils/Fade';

export type IScrimProps = IContainerProps<IScrimStyleKey> & {
  open?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  onMouseDown?: (event: React.MouseEvent) => void;
};

export const Scrim = forwardRef<HTMLDivElement, IScrimProps>(
  function Scrim(props, ref) {
    const { styles, sx, open, onClick, children, onMouseDown } = props;

    const { theme } = useComponentTheme('Scrim');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IScrimStyleKey, IScrimStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <Fade in={open} timeout={500}>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */}
        <div
          {...sxf('host', sx)}
          aria-hidden
          ref={ref}
          onClick={onClick}
          role='button'
          onMouseDown={onMouseDown}
        >
          {children}
        </div>
      </Fade>
    );
  },
);
