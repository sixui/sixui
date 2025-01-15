import type { Meta, StoryObj } from '@storybook/react';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { SideSheetContent } from './SideSheetContent';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISideSheetContentProps>;

// FIXME:
// const SideSheetContentFrame: React.FC<ISideSheetContentProps> = (props) => {
//   return (
//     <Frame
//       importParentStyles
//       w="100%"
//       h="$96"
//       style={{
//         borderWidth: px(1),
//         borderStyle: 'dashed',
//         borderColor: themeTokens.colorScheme.outline,
//       }}
//     >
//       <ThemeProvider inherit={false}>
//         <SideSheetContent {...props} w="$60">
//           FSDQSDQS
//         </SideSheetContent>
//       </ThemeProvider>
//     </Frame>
//   );
// };

const SideSheetContentShowcase = componentShowcaseFactory(SideSheetContent);

export const Basic: IStory = {
  render: (props) => <SideSheetContentShowcase props={props} fullWidth />,
  args: {
    ...defaultArgs,
    divider: true,
    w: '$80',
    h: '$96',
    headline: 'Headline',
    onClose: (args) => void sbHandleEvent('onClose', args),
    showCloseButton: true,
    header: <Placeholder expanded label="Header" />,
    children: <Placeholder expanded label="Children" />,
    footer: <Placeholder expanded label="Footer" />,
  },
};

export default meta;
