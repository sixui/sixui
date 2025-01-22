import type { Meta, StoryObj } from '@storybook/react';

import type { IAsideProps } from './Aside.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { Aside } from './Aside';

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

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
} satisfies Partial<IAsideProps>;

const AsideFrame: React.FC<IAsideProps> = (props) => {
  const { ...other } = props;
  const [standardOpened, toggleStandardOpened] = useToggle([true, false]);
  const [modalOpened, toggleModalOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleStandardOpened()}>
          {standardOpened ? 'Close' : 'Open'} standard
        </Button>
        <Button onClick={() => toggleModalOpened()}>
          {modalOpened ? 'Close' : 'Open'} modal
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
          <Aside
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            onClose={() => toggleModalOpened(false)}
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
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const LeftDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const Right: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const RightDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
