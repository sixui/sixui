import { stringFromCssProperties } from './stringFromCssProperties';

export interface IStringFromStylesMediaQuery {
  query: string;
  styles: React.CSSProperties;
}

export interface IStringFromStylesProps {
  layer?: string;
  selector: string;
  styles?: React.CSSProperties;
  mediaQueries?: Array<IStringFromStylesMediaQuery>;
  containerQueries?: Array<IStringFromStylesMediaQuery>;
}

export const stringFromStyles = (props: IStringFromStylesProps): string => {
  const { layer, selector, styles, mediaQueries, containerQueries } = props;

  const baseStyles = styles ? stringFromCssProperties(styles) : '';
  const mediaQueryStyles = mediaQueries
    ? mediaQueries.map(
        (item) =>
          `@media${item.query}{${selector}{${stringFromCssProperties(item.styles)}}}`,
      )
    : [];
  const containerQueryStyles = containerQueries
    ? containerQueries.map(
        (item) =>
          `@container${item.query}{${selector}{${stringFromCssProperties(item.styles)}}}`,
      )
    : [];

  const css =
    `${baseStyles ? `${selector}{${baseStyles}}` : ''}${mediaQueryStyles.join('')}${containerQueryStyles.join('')}`.trim();
  const cssWithLayer = layer ? `@layer ${layer}{${css}}` : css;

  return cssWithLayer;
};
