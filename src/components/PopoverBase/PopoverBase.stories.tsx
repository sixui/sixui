import type { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  faStar as faStarSolid,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPlacement } from '~/helpers/types';
import type { IComponentPresentation } from '../ComponentShowcase';
import type {
  IPopoverBaseContentRendererProps,
  IPopoverBaseProps,
} from './PopoverBase.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { PopoverBase } from './PopoverBase';

const meta = {
  component: PopoverBase,
} satisfies Meta<typeof PopoverBase>;

type IStory = StoryObj<typeof meta>;

const contentRenderer = ({
  parentProps,
  renderCursor,
  close,
}: IPopoverBaseContentRendererProps): React.JSX.Element => (
  <Placeholder
    surface="$inverseSurface"
    c="$inverseOnSurface"
    h={parentProps.matchTargetWidth ? undefined : '$24'}
    w={parentProps.matchTargetWidth ? undefined : '$24'}
    p="$2"
    shape="$sm"
  >
    {renderCursor && (
      <div style={{ fill: themeTokens.colorScheme.inverseSurface }}>
        {renderCursor()}
      </div>
    )}
    <IconButton
      variant="snackbar"
      icon={<FontAwesomeIcon icon={faXmark} />}
      onClick={close}
    />
  </Placeholder>
);

// FIXME: OpenOnClick - remove static views?

const defaultArgs = {
  onOpen: (...args) => void sbHandleEvent('onOpen', args),
  onClose: (...args) => void sbHandleEvent('onClose', args),
  contentRenderer,
  children: ({ getProps, setRef, opened }) => (
    <IconButton
      {...getProps()}
      ref={setRef}
      icon={<FontAwesomeIcon icon={faStar} />}
      selectedIcon={<FontAwesomeIcon icon={faStarSolid} />}
      toggle
      selected={opened}
    />
  ),
  positioned: true,
} satisfies Partial<IPopoverBaseProps>;

const cols: Array<IComponentPresentation<IPopoverBaseProps>> = [{}, {}, {}];

const rows: Array<IComponentPresentation<IPopoverBaseProps>> = [
  { legend: 'Basic' },
  { legend: 'With arrow', props: { cursor: 'arrow' } },
  { legend: 'With dot', props: { cursor: 'dot' } },
  { legend: 'With scrim', props: { withScrim: true } },
];

const PopoverBaseShowcase = componentShowcaseFactory(PopoverBase);

export const OpenOnHover: IStory = {
  render: (props) => (
    <PopoverBaseShowcase props={props} cols={cols} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    openEvents: { hover: true },
  },
};

export const OpenOnClick: IStory = {
  render: (props) => (
    <PopoverBaseShowcase props={props} cols={cols} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    openEvents: { click: true },
  },
};

export const OpenOnFocus: IStory = {
  render: (props) => (
    <PopoverBaseShowcase props={props} cols={cols} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    openEvents: { focus: true },
  },
};

export const MatchTargetWidth: IStory = {
  render: (props) => (
    <PopoverBaseShowcase
      props={props}
      horizontalAlign="start"
      rows={[
        {
          props: {
            children: ({ getProps, setRef }) => (
              <Button {...getProps()} ref={setRef}>
                Lorem ipsum
              </Button>
            ),
          },
        },
        {
          props: {
            children: ({ getProps, setRef }) => (
              <Button {...getProps()} ref={setRef}>
                Lorem ipsum dolor sit amet
              </Button>
            ),
          },
        },
        {
          props: {
            children: ({ getProps, setRef }) => (
              <Button {...getProps()} ref={setRef}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Button>
            ),
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    openEvents: { click: true },
    matchTargetWidth: true,
    cursor: 'arrow',
  },
};

const alignments: Array<IComponentPresentation<IPopoverBaseProps>> = [
  {
    legend: 'Start',
    props: { placement: { alignment: 'start' } as IPlacement },
  },
  { legend: 'Center' },
  { legend: 'End', props: { placement: { alignment: 'end' } as IPlacement } },
];

const sides: Array<IComponentPresentation<IPopoverBaseProps>> = [
  { legend: 'Top', props: { placement: { side: 'top' } } },
  { legend: 'Left', props: { placement: { side: 'left' } } },
  { legend: 'Right', props: { placement: { side: 'right' } } },
  { legend: 'Bottom', props: { placement: { side: 'bottom' } } },
];

export const Placement: IStory = {
  render: (props) => (
    <PopoverBaseShowcase
      props={props}
      cols={alignments}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    openEvents: { hover: true },
    cursor: 'arrow',
  },
};

export const ModalStyle: IStory = {
  render: (props) => (
    <PopoverBaseShowcase
      props={props}
      rows={sides}
      propsCombinationStrategy="merge"
    />
  ),
  args: {
    ...defaultArgs,
    openEvents: { click: true },
    style: {
      position: 'fixed',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      overflow: 'auto',
    },
    floatingMotionProps: {
      origin: 'edge',
      pattern: 'enterExitOffScreen',
    },
    positioned: false,
    withScrim: true,
    trapFocus: true,
    lockScroll: true,
  },
};

export default meta;
