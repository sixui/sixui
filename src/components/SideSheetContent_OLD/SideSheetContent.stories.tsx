import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { Frame } from '../Frame';
import { SideSheetContent } from './SideSheetContent';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  frame: {
    width: '100%',
    height: `calc(400px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
  sideSheetContent: {
    width: `calc(240px * ${scaleTokens.scale})`,
  },
});

const defaultArgs = {
  children: 'SideSheetContent',
} satisfies Partial<ISideSheetContentProps>;

const SideSheetContentFrame: React.FC<ISideSheetContentProps> = (props) => {
  return (
    <Frame importParentStyles sx={styles.frame}>
      <div>
        <SideSheetContent {...props} sx={styles.sideSheetContent} />
      </div>
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <SideSheetContentFrame {...props} />,
  args: defaultArgs,
};

export default meta;
