import * as React from 'react';

export const useId = (idOverride?: string): string => {
  const reactId = React.useId();

  return idOverride ?? reactId;
};
