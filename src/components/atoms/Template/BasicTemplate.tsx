import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IBasicTemplateProps = IContainerProps<ITemplateStyleKey> & {
  children?: React.ReactNode;
};

export const BasicTemplate = forwardRef<HTMLDivElement, IBasicTemplateProps>(
  function BasicTemplate(props, ref) {
    const { styles, sx, children, ...other } = props;

    const theme = useComponentTheme('Template');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...styleProps(['host', sx], [theme.vars])} ref={ref} {...other}>
        {children}
      </div>
    );
  },
);
