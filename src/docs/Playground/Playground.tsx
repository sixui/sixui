import { useMemo, useState } from 'react';

import type { IPlaygroundProps } from './Playground.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { playgroundStyles } from './Playground.styles';
import { PlaygroundSections } from './PlaygroundSections';

export const Playground = fixedForwardRef(function Playground<
  TComponentProps extends Record<string, unknown>,
>(
  props: IPlaygroundProps<TComponentProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const {
    styles,
    sx,
    componentRenderer,
    defaultSections,
    initialProps,
    ...other
  } = props;

  const componentTheme = useComponentTheme('Playground');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(playgroundStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [sections, setSections] = useState(defaultSections);

  const componentProps = sections
    .map(({ options }) => options)
    .flat()
    .reduce(
      (acc, option) => {
        if (option.modifiers?.disabled || option.modifiers?.off) {
          return acc;
        }

        return {
          ...acc,
          ...option.props,
          ...(option.input
            ? { [option.input.targetProp]: option.input.value }
            : undefined),
        };
      },
      (initialProps ?? {}) as TComponentProps,
    );

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      <div {...sxf('componentPanel')}>
        <div {...sxf('componentWrapper')}>
          {componentRenderer(componentProps)}
        </div>
      </div>

      <div {...sxf(stylesCombinator('optionsPanel'))}>
        <PlaygroundSections<TComponentProps>
          sections={sections}
          onSectionsChange={setSections}
          componentProps={componentProps}
        />
      </div>
    </div>
  );
});
