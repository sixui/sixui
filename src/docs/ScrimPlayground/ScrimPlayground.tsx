import type { IPlaygroundSections } from '~/docs/Playground';
import type { IScrimPlaygroundDemoProps } from './ScrimPlaygroundDemo';
import { Playground } from '~/docs/Playground';
import { ScrimPlaygroundDemo } from './ScrimPlaygroundDemo';

export const scrimPlaygroundSections: IPlaygroundSections<IScrimPlaygroundDemoProps> =
  {
    scrim: {
      title: 'Scrim',
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
      ],
    },
  };

export const ScrimPlayground: React.FC = (props) => {
  return (
    <Playground<IScrimPlaygroundDemoProps>
      {...props}
      defaultSections={scrimPlaygroundSections}
      componentRenderer={(props) => <ScrimPlaygroundDemo {...props} />}
    />
  );
};
