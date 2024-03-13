import { useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from './ComponentShowcase.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IComponentPropsWithLegend<TComponentProps> = Array<
  Partial<TComponentProps> & { $legend?: React.ReactNode }
>;

export type IComponentShowcaseProps<
  TComponentProps extends object = Record<string, never>,
> = IContainerProps<IComponentShowcaseStyleKey> & {
  component: React.FC<TComponentProps>;
  props: TComponentProps;
  groupsProps?: IComponentPropsWithLegend<TComponentProps>;
  colsProps?: IComponentPropsWithLegend<TComponentProps>;
  rowsProps?: IComponentPropsWithLegend<TComponentProps>;
  align?: 'start' | 'center';
  rowLegendPosition?: 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
};

const DUMMY_TEXT = '.';

/**
 * @deprecated Use `ComponentShowcase` from
 * `@/components/utils/ComponentShowcase2` instead.
 */
export const ComponentShowcase = <
  TComponentProps extends object = Record<string, never>,
>(
  props: IComponentShowcaseProps<TComponentProps>,
): React.ReactNode => {
  const {
    styles,
    sx,
    component: Component,
    props: componentProps,
    groupsProps,
    colsProps,
    rowsProps,
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

  const shouldShowRowLegends = rowsProps?.some(({ $legend }) => !!$legend);
  const shouldShowColLegends = colsProps?.some(({ $legend }) => !!$legend);
  const shouldShowGroupLegends = groupsProps?.some(({ $legend }) => !!$legend);

  const placeholder = { $legend: undefined };
  const nonEmptyGroupsProps = groupsProps ?? [placeholder];
  const nonEmptyColsProps = colsProps ?? [placeholder];
  const nonEmptyRowsProps = rowsProps ?? [placeholder];

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
            {nonEmptyGroupsProps.map((_, groupIndex) => (
              <div
                {...sxf('flex', 'rows', 'gap$lg')}
                key={`$legend-${groupIndex}`}
              >
                {nonEmptyRowsProps.map(({ $legend: rowLegend }, rowIndex) => (
                  <div
                    {...sxf(
                      'flex',
                      'legendRow',
                      'justifyEnd',
                      'textRight',
                      'legend',
                      !rowLegend && 'invisible',
                    )}
                    key={`$legend-${groupIndex}-${rowIndex}`}
                  >
                    {rowLegend ?? DUMMY_TEXT}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div {...sxf('cols', 'gap$md', 'itemsStart', fullWidth && 'flex')}>
        {nonEmptyColsProps.map(
          ({ $legend: colLegend, ...colProps }, colIndex) => (
            <div {...sxf('groupRows', fullWidth && 'flex')} key={colIndex}>
              {nonEmptyGroupsProps.map(
                (
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    $legend: groupLegend,
                    ...groupProps
                  },
                  groupIndex,
                ) => (
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
                      <div {...sxf('legend', !colLegend && 'invisible')}>
                        {colLegend ?? DUMMY_TEXT}
                      </div>
                    ) : null}

                    {nonEmptyRowsProps.map(
                      ({ $legend: rowLegend, ...rowProps }, rowIndex) => (
                        <div
                          key={`${colIndex}-${groupIndex}-${rowIndex}`}
                          {...sxf('flex', 'rows', fullWidth && 'w100')}
                        >
                          {shouldShowRowLegends &&
                          rowLegendPosition === 'top' &&
                          rowLegend ? (
                            <div {...sxf('legend')}>{rowLegend}</div>
                          ) : null}

                          <div {...sxf('flex', 'cols', 'gap$md', 'itemsEnd')}>
                            <Component
                              {...componentProps}
                              {...groupProps}
                              {...colProps}
                              {...rowProps}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </div>
          ),
        )}
      </div>

      {shouldShowGroupLegends ? (
        <div {...sxf('rows', 'gap$lg')}>
          {shouldShowColLegends ? (
            <div {...sxf('legend', 'invisible')} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...sxf('flex', 'groupRows')}>
            {nonEmptyGroupsProps.map(({ $legend: groupLegend }, groupIndex) => (
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
                    !groupLegend && 'invisible',
                  )}
                  key={`$legend-${groupIndex}`}
                >
                  {groupLegend ?? DUMMY_TEXT}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
