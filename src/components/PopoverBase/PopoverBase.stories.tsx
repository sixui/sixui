import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faBolt,
  faCloud,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

import type { IPopoverBaseProps } from './PopoverBase.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '~/components/ComponentShowcase';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { IconButton } from '~/components/IconButton';
import { Button } from '~/components/Button';
import { Paper } from '~/components/Paper';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { Stack } from '../Stack';
import { PopoverBase } from './PopoverBase';

const meta = {
  component: PopoverBase,
} satisfies Meta<typeof PopoverBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  tooltip: {
    backgroundColor: colorSchemeTokens.inverseSurface,
    color: colorSchemeTokens.inverseOnSurface,
    padding: spacingTokens.padding$2,
    maxWidth: `calc(240px * ${scaleTokens.scale})`,
  },
  cursor: {
    fill: colorSchemeTokens.inverseSurface,
  },
  paper: {
    maxWidth: `calc(240px * ${scaleTokens.scale})`,
  },
  paperInner: {
    padding: spacingTokens.padding$4,
  },
  padding: {
    padding: `calc(120px * ${scaleTokens.scale})`,
  },
});

const TOOLTIP_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
  contentRenderer: ({ renderCursor }) => (
    <div {...stylex.props(styles.tooltip)}>
      <div {...stylex.props(styles.cursor)}>{renderCursor()}</div>
      {TOOLTIP_CONTENT}
    </div>
  ),
} satisfies Partial<IPopoverBaseProps>;

const cols: Array<IComponentPresentation<IPopoverBaseProps>> = [
  {
    props: {
      children: ({ getProps, setRef }) => (
        <IconButton
          {...getProps()}
          ref={setRef}
          icon={<FontAwesomeIcon icon={faStar} />}
        />
      ),
    },
  },
  {
    props: {
      children: ({ getProps, setRef }) => (
        <IconButton
          {...getProps()}
          ref={setRef}
          icon={<FontAwesomeIcon icon={faBolt} />}
        />
      ),
    },
  },
  {
    props: {
      children: ({ getProps, setRef }) => (
        <IconButton
          {...getProps()}
          ref={setRef}
          icon={<FontAwesomeIcon icon={faCloud} />}
        />
      ),
    },
  },
];

const rows: Array<IComponentPresentation<IPopoverBaseProps>> = [
  {
    legend: 'Basic',
  },
  {
    legend: 'With arrow',
    props: {
      cursor: 'arrow',
    },
  },
  {
    legend: 'With dot',
    props: {
      cursor: 'dot',
    },
  },
  {
    legend: 'With scrim',
    props: {
      scrim: true,
    },
  },
];

export const OpenOnHover: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      cols={cols}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    openOnHover: true,
  },
};

export const OpenOnClick: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      cols={cols}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
  },
};

export const OpenOnFocus: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      cols={cols}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    openOnFocus: true,
  },
};

export const MatchTargetWidth: IStory = {
  render: (props) => (
    <ComponentShowcase component={PopoverBase} props={props} />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
    matchTargetWidth: true,
    children: ({ getProps, setRef }) => (
      <Button {...getProps()} ref={setRef}>
        Click to open
      </Button>
    ),
  },
};

export const Modal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      cols={cols}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
    modal: true,
    contentRenderer: ({ renderCursor, close }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor()}</div>
        {TOOLTIP_CONTENT}
        <Button onClick={close} variant='snackbar'>
          Close
        </Button>
      </div>
    ),
  },
};

export const WithPaper: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      cols={cols}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
    contentRenderer: ({ renderCursor, close }) => (
      <Paper sx={styles.paper} elevation={2} corner='md'>
        <div {...stylex.props(styles.cursor)}>{renderCursor()}</div>
        <Stack sx={styles.paperInner} gap={2}>
          <div>{TOOLTIP_CONTENT}</div>
          <Button onClick={close} variant='text'>
            Close
          </Button>
        </Stack>
      </Paper>
    ),
  },
};

export const Placement: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      sx={styles.padding}
      props={props}
      rows={[
        {
          legend: 'top-start',
          props: {
            placement: 'top-start',
          },
        },
        {
          legend: 'top',
          props: {
            placement: 'top',
          },
        },
        {
          legend: 'top-end',
          props: {
            placement: 'top-end',
          },
        },
        {
          legend: 'left-start',
          props: {
            placement: 'left-start',
          },
        },
        {
          legend: 'left',
          props: {
            placement: 'left',
          },
        },
        {
          legend: 'left-end',
          props: {
            placement: 'left-end',
          },
        },
        {
          legend: 'right-start',
          props: {
            placement: 'right-start',
          },
        },
        {
          legend: 'right',
          props: {
            placement: 'right',
          },
        },
        {
          legend: 'right-end',
          props: {
            placement: 'right-end',
          },
        },
        {
          legend: 'bottom-start',
          props: {
            placement: 'bottom-start',
          },
        },
        {
          legend: 'bottom',
          props: {
            placement: 'bottom',
          },
        },
        {
          legend: 'bottom-end',
          props: {
            placement: 'bottom-end',
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
    openOnFocus: true,
    cursor: 'arrow',
    children: ({ getProps, setRef }) => (
      <IconButton
        {...getProps()}
        ref={setRef}
        icon={<FontAwesomeIcon icon={faStar} />}
      />
    ),
    contentRenderer: ({ renderCursor }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor()}</div>
        Hello <FontAwesomeIcon icon={faSmile} />
        <br />I am a popover.
        <br />I can be placed anywhere.
      </div>
    ),
  },
};

export const TransitionOrigin: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PopoverBase}
      props={props}
      rows={[
        {
          legend: 'center',
          props: {
            transitionOrigin: 'center',
            placement: 'bottom-end',
          },
        },
        {
          legend: 'corner',
          props: {
            transitionOrigin: 'corner',
            placement: 'bottom-end',
          },
        },
        {
          legend: 'edge',
          props: {
            transitionOrigin: 'edge',
            placement: 'bottom-end',
          },
        },
        {
          legend: 'cursor',
          props: {
            transitionOrigin: 'cursor',
            placement: 'bottom-end',
            cursor: 'arrow',
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    openOnClick: true,
    openOnFocus: true,
    placement: 'bottom-end',
    children: ({ getProps, setRef }) => (
      <IconButton
        {...getProps()}
        ref={setRef}
        icon={<FontAwesomeIcon icon={faStar} />}
      />
    ),
    contentRenderer: ({ renderCursor }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor()}</div>
        Hello <FontAwesomeIcon icon={faSmile} />
        <br />I am a popover.
        <br />I can be placed anywhere.
      </div>
    ),
  },
};

export default meta;
