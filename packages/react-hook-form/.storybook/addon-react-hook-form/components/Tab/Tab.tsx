// eslint-disable-next-line
import React from 'react';
import { SyntaxHighlighter } from 'storybook/internal/components';

import styles from './Tab.module.css';

export interface ITabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any;
}

export const Tab: React.FC<ITabProps> = (props) => {
  const { json, ...other } = props;

  return (
    <SyntaxHighlighter
      language="json"
      copyable={false}
      className={styles.root}
      {...other}
    >
      {JSON.stringify(json, null, 2)}
    </SyntaxHighlighter>
  );
};
