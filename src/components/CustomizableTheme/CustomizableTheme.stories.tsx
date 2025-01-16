import type { Meta, StoryObj } from '@storybook/react';

import type { ICustomizableThemeProps } from './CustomizableTheme.types';
import { Flex } from '../Flex';
import { Placeholder } from '../Placeholder';
import { Text } from '../Text';
import { CustomizableTheme } from './CustomizableTheme';

const meta = {
  component: CustomizableTheme,
} satisfies Meta<typeof CustomizableTheme>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <Flex direction="row" gap="$2">
      <Placeholder w="$32" h="$24" surface="$primary" shape="$md">
        <Text c="$onPrimary">Primary color</Text>
      </Placeholder>
      <Placeholder w="$32" h="$24" surface="$secondary" shape="$md">
        <Text c="$onSecondary">Secondary color</Text>
      </Placeholder>
      <Placeholder w="$32" h="$24" surface="$tertiary" shape="$md">
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
