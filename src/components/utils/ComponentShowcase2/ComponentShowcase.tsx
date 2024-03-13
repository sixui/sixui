import { useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from './ComponentShowcase.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IComponentPresentation<TComponentProps> = {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
};

export type IComponentShowcaseProps<
  TComponentProps extends object = Record<string, never>,
> = IContainerProps<IComponentShowcaseStyleKey> & {
  component: React.FC<TComponentProps>;
  props: TComponentProps;
  groups?: Array<IComponentPresentation<TComponentProps>>;
  cols?: Array<IComponentPresentation<TComponentProps>>;
  rows?: Array<IComponentPresentation<TComponentProps>>;
  align?: 'start' | 'center';
  rowLegendPosition?: 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
};

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
    align = 'center',
    rowLegendPosition = 'start',
    fullWidth,
  } = props;

  const { theme } = useComponentTheme('ComponentShowcase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IComponentShowcaseStyleKey,
        IComponentShowcaseStyleVarKey
      >(stylesCombinator),
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
    <div {...sxf('host', 'cols', 'gap$md', theme.vars, sx)}>
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

      <div {...sxf('cols', 'gap$md', 'itemsStart', fullWidth && 'flex')}>
        {nonEmptyCols.map((col, colIndex) => (
          <div {...sxf('groupRows', fullWidth && 'flex')} key={colIndex}>
            {nonEmptyGroups.map((group, groupIndex) => (
              <div
                key={`${colIndex}-${groupIndex}`}
                {...sxf(
                  'rows',
                  'gap$lg',
                  align === 'start' ? 'itemsStart' : 'itemsCenter',
                  'flex',
                )}
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

                      <div {...sxf('flex', 'cols', 'gap$md', 'itemsEnd')}>
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
