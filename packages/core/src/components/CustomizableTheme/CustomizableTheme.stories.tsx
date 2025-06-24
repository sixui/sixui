import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ICustomizableThemeProps } from './CustomizableTheme.types';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { Text } from '~/components/Text';
import { CustomizableTheme } from './CustomizableTheme';

const meta = {
  component: CustomizableTheme,
} satisfies Meta<typeof CustomizableTheme>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <Flex direction="row" gap="$sm">
      <Placeholder w="128px" h="96px" surface="$primary" shape="$md">
        <Text c="$onPrimary">Primary color</Text>
      </Placeholder>
      <Placeholder w="128px" h="96px" surface="$secondary" shape="$md">
        <Text c="$onSecondary">Secondary color</Text>
      </Placeholder>
      <Placeholder w="128px" h="96px" surface="$tertiary" shape="$md">
        <Text c="$onTertiary">Tertiary color</Text>
      </Placeholder>
    </Flex>
  ),
} satisfies Partial<ICustomizableThemeProps>;

export const Basic: IStory = {
  render: (props) => <CustomizableTheme {...props} />,
  args: defaultArgs,
};

export default meta;
