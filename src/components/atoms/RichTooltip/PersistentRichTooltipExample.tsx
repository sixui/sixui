import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import { commonStyles } from '@/helpers/commonStyles';
import { Button } from '@/components/atoms/Button';
import { RichTooltip, type IRichTooltipProps } from './RichTooltip';

export const PersistentRichTooltipExample: React.FC<
  IOmit<IRichTooltipProps, 'onOpenChange'>
> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div {...stylex.props(commonStyles.horizontalLayout)}>
      <RichTooltip
        isOpen={isOpen}
        {...props}
        onOpenChange={setIsOpen}
        persistent
      >
        <Button onClick={() => setIsOpen(true)}>Show</Button>
      </RichTooltip>
    </div>
  );
};
