import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IInlineStylesProps } from './InlineStyles.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { useClassName } from '~/hooks/useClassName';
import { px } from '~/utils/css';
import { IOmit } from '~/utils/types';
import { themeTokens } from '~/components/Theme/theme.css';
import { InlineStyles } from './InlineStyles';

type IInlineStylesDemoProps = IOmit<IInlineStylesProps, 'selector'>;

const InlineStylesDemo: React.FC<IInlineStylesDemoProps> = (props) => {
  const randomClassName = useClassName();

  return (
    <>
      <InlineStyles selector={`.${randomClassName}`} {...props} />
      <Placeholder className={randomClassName} w="96px" h="96px" shape="$md" />
    </>
  );
};

const meta = {
  component: InlineStylesDemo,
} satisfies Meta<typeof InlineStylesDemo>;

type IStory = StoryObj<typeof meta>;

const cols: Array<IComponentPresentation<IInlineStylesDemoProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'With inline styles',
    props: {
      styles: {
        borderStyle: 'solid',
        borderWidth: px(themeTokens.outline.width.sm),
        borderColor: themeTokens.colorScheme.primary,
      },
    },
  },
];

const defaultArgs = {} satisfies Partial<IInlineStylesProps>;

const InlineStylesDemoShowcase = componentShowcaseFactory(InlineStylesDemo);

export const Basic: IStory = {
  render: (props) => <InlineStylesDemoShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export default meta;
