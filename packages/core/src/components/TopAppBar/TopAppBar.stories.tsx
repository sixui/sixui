import type { Meta, StoryObj } from '@storybook/react';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faBug,
  faCircleQuestion,
  faEllipsisVertical,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITopAppBarProps } from './TopAppBar.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Menu } from '~/components/Menu';
import { themeTokens } from '~/components/Theme/theme.css';
import { IconButton } from '../IconButton';
import { TopAppBar } from './TopAppBar';
import { topAppBarVariants } from './TopAppBar.types';

const meta = {
  component: TopAppBar,
} satisfies Meta<typeof TopAppBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'TopAppBar',
  w: '4px12',
  leadingNavigation: (
    <IconButton
      icon={<FontAwesomeIcon icon={faArrowLeft} />}
      onClick={() => {}}
    />
  ),
  headline: 'Summer Hits',
  trailingActions: ({ consolidated }) => (
    <>
      {!consolidated && (
        <>
          <IconButton
            icon={<FontAwesomeIcon icon={faPaperclip} />}
            onClick={() => {}}
          />
          <IconButton
            icon={<FontAwesomeIcon icon={faCalendar} />}
            onClick={() => {}}
          />
        </>
      )}
      <Menu
        trigger={({ getProps }) => (
          <IconButton
            icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
            {...getProps()}
          />
        )}
        placement={{
          side: 'bottom',
          alignment: 'end',
        }}
      >
        <Menu.Item
          trailingIcon={<FontAwesomeIcon icon={faCircleQuestion} />}
          label="Help center"
        />
        <Menu.Item
          trailingIcon={<FontAwesomeIcon icon={faBug} />}
          label="File a bug"
        />
      </Menu>
    </>
  ),
  style: {
    borderWidth: themeTokens.outline.width.xs,
    borderColor: themeTokens.colorScheme.outlineVariant,
    borderStyle: 'dashed',
  },
} satisfies Partial<ITopAppBarProps>;

const TopAppBarShowcase = componentShowcaseFactory(TopAppBar);

export const Variants: IStory = {
  render: (props) => (
    <TopAppBarShowcase
      props={props}
      rows={topAppBarVariants.map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: {
          variant,
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
