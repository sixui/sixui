import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquare,
  faCircle,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faSquare as faSquareSolid,
  faCircle as faCircleSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';

import type { INavigationRailProps } from './NavigationRail.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { Placeholder } from '../Placeholder';
import { NavigationRail } from './NavigationRail';

const meta = {
  component: NavigationRail,
} satisfies Meta<typeof NavigationRail>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    height: `calc(480px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
});

const defaultArgs = {
  sx: styles.host,
  children: (
    <>
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={faSquareSolid} />}
        label='First'
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={faCircleSolid} />}
        label='Second'
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={faHeartSolid} />}
        label='Third'
      />
    </>
  ),
  leading: <Placeholder label='Leading' corner='none' />,
  trailing: <Placeholder label='Trailing' corner='none' />,
} satisfies Partial<INavigationRailProps>;

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      props={props}
      component={NavigationRail}
      cols={[
        { legend: 'Align top', props: { groupAlignment: 'start' } },
        {
          legend: 'Align center (default)',
          props: { groupAlignment: 'center' },
        },
        { legend: 'Align bottom', props: { groupAlignment: 'end' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
