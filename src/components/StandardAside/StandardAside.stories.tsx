import type { Meta, StoryObj } from '@storybook/react';

import type { IStandardAsideProps } from './StandardAside.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { StandardAside } from './StandardAside';

const meta = {
  component: StandardAside,
} satisfies Meta<typeof StandardAside>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: (
    <Placeholder
      label="Header"
      grow={1}
      h="$16"
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  footer: (
    <Placeholder
      label="Footer"
      grow={1}
      h="$16"
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  children: (
    <Placeholder
      label="Content"
      grow={1}
      expanded
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  divider: true,
} satisfies Partial<IStandardAsideProps>;

const StandardAsideFrame: React.FC<IStandardAsideProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleOpened()}>
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <Frame
        importParentStyles
        w="100%"
        h="$96"
        style={{
          borderWidth: px(1),
          borderStyle: 'dashed',
          borderColor: themeTokens.colorScheme.outlineVariant,
        }}
      >
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <StandardAside
            opened={opened}
            onClose={() => toggleOpened(false)}
            header={
              <Placeholder
                label="Header"
                grow={1}
                h="$16"
                diagonals
                surface="$primaryContainer"
                color="$onPrimaryContainer"
              />
            }
            footer={
              <Placeholder
                label="Footer"
                grow={1}
                h="$16"
                diagonals
                surface="$primaryContainer"
                color="$onPrimaryContainer"
              />
            }
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <StandardAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <StandardAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
