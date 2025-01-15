import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ISideSheetContentProps } from './SideSheetContent.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { SideSheetContent } from './SideSheetContent';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISideSheetContentProps>;

const SideSheetContentFrame: React.FC<ISideSheetContentProps> = (props) => {
  return (
    <Frame importParentStyles sx={styles.frame}>
      <div>
        <SideSheetContent {...props} sx={styles.sideSheetContent} />
      </div>
    </Frame>
  );
};

const SideSheetContentShowcase = componentShowcaseFactory(SideSheetContent);

export const Basic: IStory = {
  render: (props) => (
    <SideSheetContentShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
