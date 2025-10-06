import { stringFromCssProperties } from './stringFromCssProperties';

export interface IStringFromStylesQuery {
  query: string;
  styles: React.CSSProperties;
}

export interface IStringFromStylesAdditionalSelector {
  selector: string;
  styles: React.CSSProperties;
}

export interface IStringFromStylesProps {
  layer?: string;
  selector: string;
  styles?: React.CSSProperties;
  queries?: Array<IStringFromStylesQuery>;
  queriesType?: 'media' | 'container';
  /**
   * Additional selectors for variant styles (e.g., dark theme)
   * These are rendered as separate CSS rules within the same layer
   */
  additionalSelectors?: Array<IStringFromStylesAdditionalSelector>;
}

export const stringFromStyles = (props: IStringFromStylesProps): string => {
  const { layer, selector, styles, queries, queriesType, additionalSelectors } =
    props;

  const baseStyles = styles ? stringFromCssProperties(styles) : '';
  const queryStyles = queries
    ? queries.map(
        (item) =>
          `@${queriesType}${item.query}{${selector}{${stringFromCssProperties(item.styles)}}}`,
      )
    : [];

  const additionalStyles = additionalSelectors
    ? additionalSelectors.map(
        (item) => `${item.selector}{${stringFromCssProperties(item.styles)}}`,
      )
    : [];

  const css =
    `${baseStyles ? `${selector}{${baseStyles}}` : ''}${additionalStyles.join('')}${queryStyles.join('')}`.trim();
  const cssWithLayer = layer ? `@layer ${layer}{${css}}` : css;

  return cssWithLayer;
};
