import type { Meta, StoryObj } from '@storybook/react';
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IExpandableProps } from './Expandable.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Paper } from '../Paper';
import { Text } from '../Text';
import { Expandable } from './Expandable';

const meta = {
  component: Expandable,
} satisfies Meta<typeof Expandable>;

type IStory = StoryObj<typeof meta>;

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et leo duis ut diam quam nulla porttitor. Tortor dignissim convallis aenean et tortor. Vulputate mi sit amet mauris commodo. Ac turpis egestas sed tempus. Id nibh tortor id aliquet lectus. Sed risus pretium quam vulputate. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Viverra ipsum nunc aliquet bibendum enim. Mauris in aliquam sem fringilla. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Nec feugiat nisl pretium fusce id velit. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. At augue eget arcu dictum varius duis at. In fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Sem fringilla ut morbi tincidunt augue interdum. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.';

const defaultArgs = {
  trigger: ({ expand, expanded, disabled }) => (
    <IconButton
      onClick={() => expand(!expanded)}
      icon={
        <FontAwesomeIcon
          icon={expanded ? faChevronCircleUp : faChevronCircleDown}
        />
      }
      disabled={disabled}
    />
  ),
  children: (
    <Box pt="$4">
      <Paper p="$4" outline="$xs" outlineStyle="dashed">
        <Text>{TEXT}</Text>
      </Paper>
    </Box>
  ),
  orientation: 'vertical',
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<IExpandableProps>;

const ExpandableDemo: React.FC<IExpandableProps> = (props) => (
  <Flex direction="column" align="start" grow maw={px(400)} pos="relative">
    <Expandable {...props} />
  </Flex>
);

export const Basic: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: defaultArgs,
};

export const Nested: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: {
    ...defaultArgs,
    children: <ExpandableDemo {...defaultArgs} />,
  },
};

export const CollapsedSize: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: {
    ...defaultArgs,
    collapsedSize: 200,
  },
};

export const Disabled: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const DefaultExpanded: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: {
    ...defaultArgs,
    defaultExpanded: true,
  },
};

export const InitiallyExpanded: IStory = {
  render: (props) => <ExpandableDemo {...props} />,
  args: {
    ...defaultArgs,
    initiallyExpanded: true,
  },
};

export default meta;
