import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IPaperProps } from '../Paper';
import type { IThemeWindowSizeClassName } from '../ThemeProvider';
import {
  getResponsiveCssValue,
  IResponsiveStyleRuleOperator,
} from '~/helpers/styles/getResponsiveCssValue';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Paper } from '../Paper';
import { PaperBase } from '../PaperBase';
import { themeTokens, windowSizeClassNames } from '../ThemeProvider';

interface IResponsivePaperProps extends IPaperProps {
  windowSizeClassName?: IThemeWindowSizeClassName;
  op?: IResponsiveStyleRuleOperator;
}

const ResponsivePaper: React.FC<IResponsivePaperProps> = ({
  windowSizeClassName,
  op,
  ...props
}) => (
  <Paper
    {...props}
    style={
      windowSizeClassName &&
      assignInlineVars({
        [PaperBase.theme.tokens.container.color]: getResponsiveCssValue({
          size: windowSizeClassName,
          op,
          then: themeTokens.colorScheme.primary,
          else: themeTokens.colorScheme.surfaceContainerHighest,
        }),
      })
    }
  />
);

const meta = {
  component: ResponsivePaper,
} satisfies Meta<typeof ResponsivePaper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$8',
  h: '$8',
  shape: '$xs',
} satisfies Partial<IResponsivePaperProps>;

const ResponsivePaperShowcase = componentShowcaseFactory(ResponsivePaper);

export const Basic: IStory = {
  render: (props) => (
    <ResponsivePaperShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSizeClassName) => ({
        legend: capitalizeFirstLetter(windowSizeClassName),
        props: {
          windowSizeClassName,
        },
      }))}
      rows={[
        {
          legend: 'Equal (=)',
          props: {
            op: '=',
          },
        },
        {
          legend: 'Less than (<)',
          props: {
            op: '<',
          },
        },
        {
          legend: 'Greater than or equal (>=)',
          props: {
            op: '>=',
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
