import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import { AvatarDemo, IAvatarDemoProps } from './AvatarDemo';

const defaultSections: IPlaygroundSections<IAvatarDemoProps> = [
  {
    title: 'Props',
    options: [
      {
        label: 'Variant',
        input: {
          type: 'string',
          targetProp: 'variant',
          value: 'rounded',
          items: [
            { label: 'Rounded', value: 'rounded' },
            { label: 'Squared', value: 'squared' },
          ],
        },
        modifiers: {
          required: true,
        },
      },
      {
        label: 'Image',
        input: {
          type: 'string',
          targetProp: 'src',
          value: 'https://avatars.githubusercontent.com/u/2182039',
        },
      },
      {
        label: 'Text fallback',
        input: {
          type: 'string',
          targetProp: 'children',
          value: 'OP',
        },
      },
      {
        label: 'Random color from text',
        props: {
          fallbackToRandomColor: true,
        },
        modifiers: {
          off: true,
        },
      },
    ],
  },
];

export const AvatarPlayground: React.FC = (props) => {
  return (
    <Playground<IAvatarDemoProps>
      {...props}
      defaultSections={defaultSections}
      componentRenderer={(componentProps) => <AvatarDemo {...componentProps} />}
    />
  );
};
