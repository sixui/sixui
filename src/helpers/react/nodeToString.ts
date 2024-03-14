import { isValidElement } from 'react';

export const reactNodeToString = (
  reactNode: React.ReactNode,
): string | undefined => {
  if (typeof reactNode === 'string') {
    return reactNode;
  }

  if (typeof reactNode === 'number') {
    return reactNode.toString();
  }

  if (reactNode instanceof Array) {
    return reactNode.map(reactNodeToString).join('');
  }

  if (isValidElement(reactNode)) {
    return reactNodeToString(
      (reactNode as React.ReactElement<{ children?: React.ReactNode }>).props
        .children,
    );
  }

  return undefined;
};
