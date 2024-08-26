import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import type { IStateLayerProps } from './StateLayer.types';
import { StateLayer } from './StateLayer';
import * as styles from './StateLayer.stories.css';

// https://material-web.dev/components/ripple/
// https://github.com/material-components/material-web/blob/main/ripple/demo/stories.ts

const meta = {
  component: StateLayer,
} satisfies Meta<typeof StateLayer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStateLayerProps>;

const states: Array<IComponentPresentation<IStateLayerProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
  { legend: 'Disabled', props: { disabled: true } },
];

export const Bounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(variantArgs) => (
        <div className={clsx(styles.container, styles.container$bounded)}>
          <StateLayer {...props} {...variantArgs} />
        </div>
      )}
      props={props}
      cols={states}
    />
  ),
  args: defaultArgs,
};

// const unboundedStyles = stylex.create({
//   host: {
//     borderRadius: '50%',
//     inset: 'none',
//     width: `calc(64px * ${scaleTokens.scale})`,
//     height: `calc(64px * ${scaleTokens.scale})`,
//   },
// });

// const UnboundedComponent: React.FC<IStateLayerProps> = (props) => {
//   const controlRef = useRef<HTMLDivElement>(null);

//   return (
//     <div
//       {...stylex.props(styles.container, styles.container$unbounded)}
//       ref={controlRef}
//     >
//       <div {...stylex.props(styles.anchor)}>
//         <StateLayer {...props} styles={unboundedStyles} for={controlRef} />
//       </div>
//     </div>
//   );
// };

// export const Unbounded: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={(variantArgs) => (
//         <UnboundedComponent {...props} {...variantArgs} />
//       )}
//       props={props}
//       cols={states}
//     />
//   ),
//   args: defaultArgs,
// };

// export const Overlapping: IStory = {
//   render: (props) => (
//     <ComponentShowcase
//       component={(variantArgs) => (
//         <div {...stylex.props(styles.overlappingContainer)}>
//           <div {...stylex.props(styles.container, styles.container$bounded)}>
//             <StateLayer {...props} {...variantArgs} />
//           </div>
//           <div {...stylex.props(styles.container, styles.container$inner)}>
//             <StateLayer {...props} {...variantArgs} />
//           </div>
//         </div>
//       )}
//       props={props}
//     />
//   ),
//   args: defaultArgs,
// };

export default meta;
