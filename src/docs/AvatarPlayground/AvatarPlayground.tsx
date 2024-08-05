import type { IPlaygroundSections } from '~/docs/Playground';
import { Playground } from '~/docs/Playground';
import {
  AvatarPlaygroundDemo,
  type IAvatarPlaygroundDemoProps,
} from './AvatarPlaygroundDemo';

export const avatarPlaygroundSections: IPlaygroundSections<IAvatarPlaygroundDemoProps> =
  {
    avatar: {
      title: 'Avatar',
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
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Text fallback',
          input: {
            type: 'string',
            targetProp: 'children',
            value: 'OP',
          },
          modifiers: {
            on: true,
          },
        },
        {
          label: 'Random color from text',
          props: {
            fallbackToRandomColor: true,
          },
        },
      ],
    },
  };

export const AvatarPlayground: React.FC = (props) => {
  return (
    <Playground<IAvatarPlaygroundDemoProps>
      {...props}
      defaultSections={avatarPlaygroundSections}
      componentRenderer={(props) => <AvatarPlaygroundDemo {...props} />}
    />
  );
};
