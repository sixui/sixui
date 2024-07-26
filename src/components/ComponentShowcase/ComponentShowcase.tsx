import { useMemo } from 'react';

import type {
  IComponentPresentation,
  IComponentShowcaseProps,
} from './ComponentShowcase.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { componentShowcaseTheme } from './ComponentShowcase.stylex';
import { componentShowcaseStyles } from './ComponentShowcase.styles';

const DUMMY_TEXT = '.';

export const ComponentShowcase = <
  TComponentProps extends object = Record<string, never>,
>(
  props: IComponentShowcaseProps<TComponentProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
    component,
    props: componentProps,
    groups,
    cols,
    rows,
    horizontalAlign = 'center',
    verticalAlign = 'end',
    rowLegendPosition = 'start',
    fullWidth,
  } = props;

  const componentTheme = useComponentTheme('ComponentShowcase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(componentShowcaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const shouldShowRowLegends = rows?.some(({ legend }) => !!legend);
  const shouldShowColLegends = cols?.some(({ legend }) => !!legend);
  const shouldShowGroupLegends = groups?.some(({ legend }) => !!legend);

  const placeholder: IComponentPresentation<TComponentProps> = {};
  const nonEmptyGroups = groups ?? [placeholder];
  const nonEmptyCols = cols ?? [placeholder];
  const nonEmptyRows = rows ?? [placeholder];

  return (
    <div
      {...sxf(
        componentShowcaseTheme,
        componentTheme.overridenStyles,
        'host',
        'cols',
        'gap$md',
        sx,
      )}
    >
      {shouldShowRowLegends && rowLegendPosition === 'start' ? (
        <div {...sxf('rows', 'gap$lg')}>
          {shouldShowColLegends ? (
            <div {...sxf('legend', 'invisible')} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...sxf('flex', 'groupRows')}>
            {nonEmptyGroups.map((_, groupIndex) => (
              <div
                {...sxf('flex', 'rows', 'gap$lg')}
                key={`$legend-${groupIndex}`}
              >
                {nonEmptyRows.map((row, rowIndex) => (
                  <div
                    {...sxf(
                      'flex',
                      'legendRow',
                      'justifyEnd',
                      'textRight',
                      'legend',
                      !row.legend && 'invisible',
                    )}
                    key={`$legend-${groupIndex}-${rowIndex}`}
                  >
                    {row.legend ?? DUMMY_TEXT}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div {...sxf('cols', 'gap$md', 'align$start', fullWidth && 'flex')}>
        {nonEmptyCols.map((col, colIndex) => (
          <div {...sxf('groupRows', fullWidth && 'flex')} key={colIndex}>
            {nonEmptyGroups.map((group, groupIndex) => (
              <div
                key={`${colIndex}-${groupIndex}`}
                {...sxf('rows', 'gap$lg', `align$${horizontalAlign}`, 'flex')}
              >
                {shouldShowColLegends && groupIndex === 0 ? (
                  <div {...sxf('legend', !col.legend && 'invisible')}>
                    {col.legend ?? DUMMY_TEXT}
                  </div>
                ) : null}

                {nonEmptyRows.map((row, rowIndex) => {
                  const Component =
                    row.component ??
                    col.component ??
                    group.component ??
                    component;
                  const hidden = row.hiddenIndexes?.includes(colIndex) ?? false;

                  return (
                    <div
                      key={`${colIndex}-${groupIndex}-${rowIndex}`}
                      {...sxf(
                        'flex',
                        'rows',
                        fullWidth && 'w100',
                        hidden && 'invisible',
                      )}
                    >
                      {shouldShowRowLegends &&
                      rowLegendPosition === 'top' &&
                      row.legend ? (
                        <div {...sxf('legend')}>{row.legend}</div>
                      ) : null}

                      <div
                        {...sxf(
                          'flex',
                          'cols',
                          'gap$md',
                          `align$${verticalAlign}`,
                        )}
                      >
                        <Component
                          {...componentProps}
                          {...group.props}
                          {...col.props}
                          {...row.props}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {shouldShowGroupLegends ? (
        <div {...sxf('rows', 'gap$lg')}>
          {shouldShowColLegends ? (
            <div {...sxf('legend', 'invisible')} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...sxf('flex', 'groupRows')}>
            {nonEmptyGroups.map((group, groupIndex) => (
              <div
                {...sxf('flex', 'rows', 'gap$lg')}
                key={`$legend-${groupIndex}`}
              >
                <div
                  {...sxf(
                    'flex',
                    'legendRow',
                    'justifyStart',
                    'legend',
                    'leftBorder',
                    !group.legend && 'invisible',
                  )}
                  key={`$legend-${groupIndex}`}
                >
                  {group.legend ?? DUMMY_TEXT}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
