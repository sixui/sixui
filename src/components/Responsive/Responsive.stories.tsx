import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperProps } from '../Paper';
import type { IThemeWindowSizeClassName } from '../ThemeProvider';
import { getResponsiveCssValue } from '~/helpers/styles/getResponsiveCssValue';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Paper } from '../Paper';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$8',
  h: '$8',
  shape: '$xs',
} satisfies Partial<IPaperProps>;

const PaperShowcase = componentShowcaseFactory(Paper);

export const Basic: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      cols={(
        [
          'compact',
          'medium',
          'expanded',
          'large',
          'extraLarge',
        ] as Array<IThemeWindowSizeClassName>
      ).map((windowClassSize) => ({
        legend: capitalizeFirstLetter(windowClassSize),
        props: {
          style: assignInlineVars({
            [PaperBase.theme.tokens.container.color]: getResponsiveCssValue({
              size: windowClassSize,
              then: themeTokens.colorScheme.primary,
              else: themeTokens.colorScheme.surfaceContainerHighest,
            }),
          }),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
