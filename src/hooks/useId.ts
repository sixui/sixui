import React from 'react';

export const useId = (idOverride?: string): string | undefined => {
  const reactId = React.useId();

  return idOverride ?? reactId;
};
