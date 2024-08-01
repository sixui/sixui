import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { ScrimDemo, type IScrimDemoProps } from './ScrimDemo';

const defaultSections: IPlaygroundSections<IScrimDemoProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Variant',
        input: {
          type: 'string',
          value: 'darken',
          items: [
            { label: 'Darken', value: 'darken' },
            { label: 'Lighten', value: 'lighten' },
          ],
          targetProp: 'variant',
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Contained',
        props: {
          contained: true,
          lockScroll: false,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

export const ScrimPlayground: React.FC = (props) => {
  return (
    <Playground<IScrimDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => <ScrimDemo {...componentProps} />}
    />
  );
};
