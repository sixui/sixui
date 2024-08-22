import stylex from '@stylexjs/stylex';

import { commonStyles } from '~/helpers/commonStyles';

export const PreventAutoFocus: React.FC = () => {
  // This is a hack to prevent the first focusable element from being focused
  // when the side sheet is opened.

  return (
    <button
      aria-hidden
      type='button'
      {...stylex.props(commonStyles.outOfScreen)}
    />
  );
};
