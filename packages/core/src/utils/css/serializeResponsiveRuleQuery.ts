import { getMaxWidthMinusEpsilon } from './getMaxWidthMinusEpsilon';

export type IResponsiveRuleQuery = {
  minWidth?: string;
  maxWidth?: string;
};

export const serializeResponsiveRuleQuery = (
  query: IResponsiveRuleQuery,
): string => {
  const maxWidthMinusEpsilon =
    query.maxWidth !== undefined
      ? getMaxWidthMinusEpsilon(query.maxWidth)
      : undefined;

  const queries = [
    query.minWidth && `(min-width: ${query.minWidth})`,
    maxWidthMinusEpsilon && `(max-width: ${maxWidthMinusEpsilon})`,
  ];

  return queries.filter(Boolean).join(' and ');
};
