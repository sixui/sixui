import type { Meta, StoryObj } from '@storybook/react';
import {
  faArrowUpFromBracket,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IDropZoneProps } from './DropZone.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { DropZone } from './DropZone';

const meta = {
  component: DropZone,
} satisfies Meta<typeof DropZone>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '384px',
  h: '120px',
} satisfies Partial<IDropZoneProps>;

const DropZoneShowcase = componentShowcaseFactory(DropZone);

export const Empty: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Drop something here',
  },
};

export const WithError: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Cannot drop here',
    hasError: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Cannot drop here',
    hasError: true,
    errorText: 'You have reached the maximum number of files.',
  },
};

export const Actionable: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Drag and drop a file here, or:',
    onClick: (...args) => sbHandleEvent('onClick', args),
    actionIcon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
    actionLabel: 'Browse...',
  },
};

export const WithSupportingText: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Drag and drop a file here, or:',
    onClick: (...args) => sbHandleEvent('onClick', args),
    actionIcon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
    actionLabel: 'Browse...',
    supportingText: 'Optimal size: 1080x600px',
    trailingSupportingText: '1 / 4',
  },
};

export const WithChildren: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Drop here or click here, or:',
    actionIcon: undefined,
    actionLabel: undefined,
    children: (
      <Flex direction="row" gap="$xs">
        <Button
          variant="text"
          leadingIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
        >
          Browse...
        </Button>
        <Button
          variant="text"
          leadingIcon={<FontAwesomeIcon icon={faPalette} />}
        >
          Browse gallery
        </Button>
      </Flex>
    ),
  },
};

export const Dropping: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: 'Can drop here',
    dropping: true,
  },
};

export const Disabled: IStory = {
  render: (props) => <DropZoneShowcase props={props} />,
  args: {
    ...defaultArgs,
    label: "Don't drop here",
    disabled: true,
    supportingText: 'Optimal size: 1080x600px',
    trailingSupportingText: '1 / 4',
  },
};

export default meta;
