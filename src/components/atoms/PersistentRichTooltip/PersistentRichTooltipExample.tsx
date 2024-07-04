import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IOmit } from '@/helpers/types';
import { commonStyles } from '@/helpers/commonStyles';
import { Button } from '@/components/atoms/Button';
import {
  PersistentRichTooltip,
  type IPersistentRichTooltipProps,
} from './PersistentRichTooltip';

export const PersistentRichTooltipExample: React.FC<
  IOmit<IPersistentRichTooltipProps, 'onOpenChange'>
> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div {...stylex.props(commonStyles.horizontalLayout)}>
      <PersistentRichTooltip
        isOpen={isOpen}
        {...props}
        onOpenChange={setIsOpen}
      >
        <Button onClick={() => setIsOpen(true)}>Show</Button>
      </PersistentRichTooltip>
    </div>
  );
};
