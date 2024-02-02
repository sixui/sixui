import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { ITypographyStyleKey } from './Typography.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface ITypographyProps
  extends Omit<IContainer<ITypographyStyleKey>, 'theme'> {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'lg' | 'md' | 'sm';
  children?: React.ReactNode;
  gutterBottom?: boolean;
  component?: React.ElementType;
}

const tagMap = {
  display$lg: 'span',
  display$md: 'span',
  display$sm: 'span',
  headline$lg: 'h1',
  headline$md: 'h2',
  headline$sm: 'h3',
  title$lg: 'h4',
  title$md: 'h5',
  title$sm: 'h6',
  body$lg: 'p',
  body$md: 'p',
  body$sm: 'p',
  label$lg: 'span',
  label$md: 'span',
  label$sm: 'span',
};

export const Typography: React.FC<ITypographyProps> = ({
  variant = 'body',
  size = 'md',
  children,
  gutterBottom,
  component,
  ...props
}) => {
  const theme = useComponentTheme('Typography');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITypographyStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const Tag = component ?? tagMap[`${variant}$${size}`];

  return (
    <Tag
      {...styleProps([
        'host',
        gutterBottom && 'host$gutterBottom',
        `${variant}$${size}`,
      ])}
    >
      {children}
    </Tag>
  );
};
