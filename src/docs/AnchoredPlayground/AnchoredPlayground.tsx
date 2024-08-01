import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { AnchoredDemo, IAnchoredDemoProps } from './AnchoredDemo';

const defaultSections: IPlaygroundSections<IAnchoredDemoProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Overlap',
        input: {
          type: 'string',
          targetProp: 'overlap',
          value: 'rectangular',
          items: [
            { label: 'Rectangular', value: 'rectangular' },
            { label: 'Circular', value: 'circular' },
          ],
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Vertical origin',
        input: {
          type: 'string',
          targetProp: 'verticalOrigin',
          value: 'top',
          items: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Horizontal origin',
        input: {
          type: 'string',
          targetProp: 'horizontalOrigin',
          value: 'right',
          items: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Invisible',
        props: {
          invisible: true,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

export const AnchoredPlayground: React.FC = (props) => {
  return (
    <Playground<IAnchoredDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => (
        <AnchoredDemo {...componentProps} />
      )}
    />
  );
};
