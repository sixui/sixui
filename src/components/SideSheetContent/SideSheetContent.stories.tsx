import type { Meta, StoryObj } from '@storybook/react';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { px } from '~/helpers/styles/px';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Frame } from '../Frame';
import { SixuiProvider } from '../SixuiProvider';
import { ThemeProvider, themeTokens } from '../ThemeProvider';
import { SideSheetContent } from './SideSheetContent';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISideSheetContentProps>;

const SideSheetContentFrame: React.FC<ISideSheetContentProps> = (props) => {
  return (
    <Frame
      importParentStyles
      w="100%"
      h="$96"
      style={{
        borderWidth: px(1),
        borderStyle: 'dashed',
        borderColor: themeTokens.colorScheme.outline,
      }}
    >
      <ThemeProvider inherit={false}>
        <SideSheetContent {...props} w="$60">
          FSDQSDQS
        </SideSheetContent>
      </ThemeProvider>
    </Frame>
  );
};

const SideSheetContentFrameShowcase = componentShowcaseFactory(
  SideSheetContentFrame,
);

export const Basic: IStory = {
  render: (props) => <SideSheetContentFrameShowcase props={props} fullWidth />,
  args: defaultArgs,
};

export default meta;
