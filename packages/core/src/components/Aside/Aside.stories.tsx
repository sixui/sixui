import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IAsideProps } from './Aside.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { useToggle } from '~/hooks/useToggle';
import { px } from '~/utils/css/px';
import { Aside } from './Aside';

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
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
} satisfies Partial<IAsideProps>;

const AsideFrame: React.FC<IAsideProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isModal, setModal] = useState(false);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
        <Labeled label="Modal" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setModal(!!value);
            }}
          >
            {isModal ? 'Close' : 'Open'} modal
          </Checkbox>
        </Labeled>
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
            opened={opened}
            modal={isModal}
            onClose={() => {
              toggleOpened(false);
            }}
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromLeftDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const FromRight: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const FromRightDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
