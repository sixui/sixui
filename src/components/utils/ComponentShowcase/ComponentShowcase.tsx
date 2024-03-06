import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  IComponentShowcaseStyleKey,
  IComponentShowcaseStyleVarKey,
} from './ComponentShowcase.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IComponentPropsWithLegend<IComponentProps> = Array<
  Partial<IComponentProps> & { $legend?: React.ReactNode }
>;

export type IComponentShowcaseProps<IComponentProps> =
  IContainerProps<IComponentShowcaseStyleKey> & {
    component: React.FC<IComponentProps>;
    props: IComponentProps;
    groupsProps?: IComponentPropsWithLegend<IComponentProps>;
    colsProps?: IComponentPropsWithLegend<IComponentProps>;
    rowsProps?: IComponentPropsWithLegend<IComponentProps>;
    align?: 'start' | 'center';
    rowLegendPosition?: 'start' | 'top' | 'bottom';
    fullWidth?: boolean;
  };

const DUMMY_TEXT = '.';

export const ComponentShowcase = <TComponentProps,>(
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

  const theme = useComponentTheme('ComponentShowcase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const styleProps = useMemo(
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
    <div {...styleProps(['host', 'cols', 'gap$md', sx], [theme.vars])}>
      {shouldShowRowLegends && rowLegendPosition === 'start' ? (
        <div {...styleProps(['rows', 'gap$lg'])}>
          {shouldShowColLegends ? (
            <div {...styleProps(['legend', 'invisible'])} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...styleProps(['flex', 'groupRows'])}>
            {nonEmptyGroupsProps.map((_, groupIndex) => (
              <div
                {...styleProps(['flex', 'rows', 'gap$lg'])}
                key={`$legend-${groupIndex}`}
              >
                {nonEmptyRowsProps.map(({ $legend: rowLegend }, rowIndex) => (
                  <div
                    {...styleProps([
                      'flex',
                      'legendRow',
                      'justifyEnd',
                      'textRight',
                      'legend',
                      !rowLegend && 'invisible',
                    ])}
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

      <div
        {...styleProps(['cols', 'gap$md', 'itemsStart', fullWidth && 'flex'])}
      >
        {nonEmptyColsProps.map(
          ({ $legend: colLegend, ...colProps }, colIndex) => (
            <div
              {...styleProps(['groupRows', fullWidth && 'flex'])}
              key={colIndex}
            >
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
                    {...styleProps([
                      'rows',
                      'gap$lg',
                      align === 'start' ? 'itemsStart' : 'itemsCenter',
                      'flex',
                    ])}
                  >
                    {shouldShowColLegends && groupIndex === 0 ? (
                      <div
                        {...styleProps(['legend', !colLegend && 'invisible'])}
                      >
                        {colLegend ?? DUMMY_TEXT}
                      </div>
                    ) : null}

                    {nonEmptyRowsProps.map(
                      ({ $legend: rowLegend, ...rowProps }, rowIndex) => (
                        <div
                          key={`${colIndex}-${groupIndex}-${rowIndex}`}
                          {...styleProps(['flex', 'rows', fullWidth && 'w100'])}
                        >
                          {shouldShowRowLegends &&
                          rowLegendPosition === 'top' &&
                          rowLegend ? (
                            <div {...styleProps(['legend'])}>{rowLegend}</div>
                          ) : null}

                          <div
                            {...styleProps([
                              'flex',
                              'cols',
                              'gap$md',
                              'itemsEnd',
                            ])}
                          >
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
        <div {...styleProps(['rows', 'gap$lg'])}>
          {shouldShowColLegends ? (
            <div {...styleProps(['legend', 'invisible'])} aria-hidden>
              {DUMMY_TEXT}
            </div>
          ) : null}

          <div {...styleProps(['flex', 'groupRows'])}>
            {nonEmptyGroupsProps.map(({ $legend: groupLegend }, groupIndex) => (
              <div
                {...styleProps(['flex', 'rows', 'gap$lg'])}
                key={`$legend-${groupIndex}`}
              >
                <div
                  {...styleProps([
                    'flex',
                    'legendRow',
                    'justifyStart',
                    'legend',
                    'leftBorder',
                    !groupLegend && 'invisible',
                  ])}
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
