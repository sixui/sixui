import type { Meta, StoryObj } from '@storybook/react';
import { faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISearchBarProps } from './SearchBar.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IconButton } from '~/components/IconButton';
import { SearchBar } from './SearchBar';

const meta = {
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  placeholder: 'Search',
  w: '$56',
} satisfies Partial<ISearchBarProps>;

const states: Array<IComponentPresentation<ISearchBarProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { loading: true } },
];

const rows: Array<IComponentPresentation<ISearchBarProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With leading icon',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faSearch} />,
    },
  },
  {
    legend: 'With trailing action',
    props: {
      trailingActions: (
        <IconButton
          icon={<FontAwesomeIcon icon={faMicrophone} />}
          onClick={() => {}}
        />
      ),
    },
  },
  {
    legend: 'With trailing avatar',
    props: {
      trailingAvatarProps: {
        src: 'https://avatars.githubusercontent.com/u/2182039?v=4&s=256',
      },
    },
  },
];

const SearchBarShowcase = componentShowcaseFactory(SearchBar);

export const Basic: IStory = {
  render: (props) => (
    <SearchBarShowcase props={props} rows={rows} cols={states} />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <SearchBarShowcase
      props={props}
      cols={[
        { legend: '-3', props: { density: -3 } },
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <SearchBarShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export default meta;
