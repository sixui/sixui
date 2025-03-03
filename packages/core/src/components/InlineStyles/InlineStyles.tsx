import type { IInlineStylesProps } from './InlineStyles.types';
import { stringFromStyles } from '~/utils/css';

export const InlineStyles: React.FC<IInlineStylesProps> = (props) => {
  const css = stringFromStyles(props);

  return (
    <style
      data-sixui-styles="inline"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
};
