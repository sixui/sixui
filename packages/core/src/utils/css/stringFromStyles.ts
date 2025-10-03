import { stringFromCssProperties } from './stringFromCssProperties';

export interface IStringFromStylesQuery {
  query: string;
  styles: React.CSSProperties;
}

export interface IStringFromStylesProps {
  layer?: string;
  selector: string;
  styles?: React.CSSProperties;
  queries?: Array<IStringFromStylesQuery>;
  queriesType?: 'media' | 'container';
}

export const stringFromStyles = (props: IStringFromStylesProps): string => {
  const { layer, selector, styles, queries, queriesType } = props;

  const baseStyles = styles ? stringFromCssProperties(styles) : '';
  const queryStyles = queries
    ? queries.map(
        (item) =>
          `@${queriesType}${item.query}{${selector}{${stringFromCssProperties(item.styles)}}}`,
      )
    : [];

  const css =
    `${baseStyles ? `${selector}{${baseStyles}}` : ''}${queryStyles.join('')}`.trim();
  const cssWithLayer = layer ? `@layer ${layer}{${css}}` : css;

  return cssWithLayer;
};
