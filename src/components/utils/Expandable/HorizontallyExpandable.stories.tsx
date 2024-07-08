import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { Expandable, type IExpandableProps } from './Expandable';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { IconButton } from '@/components/atoms/IconButton';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const meta = {
  component: Expandable,
} satisfies Meta<typeof Expandable>;

type IStory = StoryObj<typeof meta>;

const TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et leo duis ut diam quam nulla porttitor. Tortor dignissim convallis aenean et tortor. Vulputate mi sit amet mauris commodo. Ac turpis egestas sed tempus. Id nibh tortor id aliquet lectus. Sed risus pretium quam vulputate. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Viverra ipsum nunc aliquet bibendum enim. Mauris in aliquam sem fringilla. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Nec feugiat nisl pretium fusce id velit. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. At augue eget arcu dictum varius duis at. In fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Sem fringilla ut morbi tincidunt augue interdum. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',
    maxWidth: 800,
  },
  panel: {
    paddingLeft: 16,
  },
  innerPanel: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colorRolesVars.outline,
    padding: 16,
  },
});

const defaultArgs = {
  trigger: ({ expand, expanded, disabled }) => (
    <IconButton
      onClick={() => expand(!expanded)}
      icon={
        <FontAwesomeIcon
          icon={expanded ? faChevronCircleLeft : faChevronCircleRight}
        />
      }
      disabled={disabled}
    />
  ),
  children: (
    <div {...stylex.props(styles.panel)}>
      <div {...stylex.props(styles.innerPanel)}>{TEXT}</div>
    </div>
  ),
  orientation: 'horizontal',
  onChange: (...args) => void sbHandleEvent('change', args),
} satisfies Partial<IExpandableProps>;

export const Basic: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.container)}>
      <Expandable {...props} />
    </div>
  ),
  args: defaultArgs,
};

export const CollapsedSize: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.container)}>
      <Expandable {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    collapsedSize: 200,
  },
};

export const Disabled: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.container)}>
      <Expandable {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const DefaultExpanded: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.container)}>
      <Expandable {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    defaultExpanded: true,
  },
};

export default meta;