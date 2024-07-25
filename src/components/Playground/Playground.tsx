import { useMemo, useState } from 'react';

import type { IPlaygroundOption, IPlaygroundProps } from './Playground.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';
import { playgroundStyles } from './Playground.styles';
import { PlaygroundOptions } from './PlaygroundOptions';

export const Playground = fixedForwardRef(function Playground<
  TComponentProps extends Record<string, unknown>,
>(
  props: IPlaygroundProps<TComponentProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const { styles, sx, componentRenderer, options, ...other } = props;

  const componentTheme = useComponentTheme('Playground');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(playgroundStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const optionsEntries = Object.entries(options) as Array<
    [keyof TComponentProps, IPlaygroundOption]
  >;
  const defaultComponentProps = optionsEntries.reduce(
    (acc, [propName, option]) => {
      if (option.modifiers?.disabled) {
        return acc;
      }

      return {
        ...acc,
        [propName]: option.defaultValue,
      };
    },
    {} as TComponentProps,
  );

  const [componentProps, setComponentProps] = useState<TComponentProps>(
    defaultComponentProps,
  );

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      {componentRenderer(componentProps)}

      <PlaygroundOptions<TComponentProps>
        options={options}
        defaultComponentProps={defaultComponentProps}
        onComponentPropsChange={setComponentProps}
      />
    </div>
  );
});
