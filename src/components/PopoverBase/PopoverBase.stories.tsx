import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import type { IPopoverBaseProps } from './PopoverBase.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/ComponentShowcase';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { IconButton } from '@/components/IconButton';
import { Button } from '@/components/Button';
// import { Paper } from '@/components/Paper';
import { PopoverBase } from './PopoverBase';

const meta = {
  component: PopoverBase,
} satisfies Meta<typeof PopoverBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  tooltip: {
    backgroundColor: colorSchemeTokens.inverseSurface,
    color: colorSchemeTokens.inverseOnSurface,
    padding: 8,
    maxWidth: 200,
  },
  cursor: {
    fill: colorSchemeTokens.surfaceContainer,
  },
  // test: {
  //   maxWidth: 200,
  // },
  // testInner: {
  //   padding: '1rem',
  // },
});

const TOOLTIP_CONTENT =
  'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.';

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
  contentRenderer: ({ renderCursor }) => (
    <div {...stylex.props(styles.tooltip)}>
      <div {...stylex.props(styles.cursor)}>{renderCursor?.()}</div>
      {TOOLTIP_CONTENT}
    </div>
  ),
} satisfies Partial<IPopoverBaseProps>;

const cols: Array<IComponentPresentation<IPopoverBaseProps>> = [
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faStar} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faBolt} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faCloud} />} />,
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

export const NonDismissable: IStory = {
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
    nonDismissable: true,
    contentRenderer: ({ renderCursor, close }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor?.()}</div>
        {TOOLTIP_CONTENT}
        <Button onClick={close} variant='snackbar'>
          Close
        </Button>
      </div>
    ),
  },
};

// export const WithCard: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={PopoverBase}
//       props={props}
//       cols={cols}
//       rows={rows}
//     />
//   ),
//   args: {
//     ...defaultArgs,
//     openOnClick: true,
//     contentRenderer: ({ renderCursor, close }) => (
//       <>
//         <div {...stylex.props(styles.cursor)}>{renderCursor?.()}</div>
//         <Paper sx={styles.test} elevation={4}>
//           <div {...stylex.props(styles.testInner)}>
//             {TOOLTIP_CONTENT}
//             <Button onClick={close}>Close</Button>
//           </div>
//         </Paper>
//       </>
//     ),
//   },
// };

export default meta;
