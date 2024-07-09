import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import { Copyable, type ICopyableProps } from './Copyable';
import { IconButton } from '@/components/atoms/IconButton';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { Typography } from '@/components/atoms/Typography';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const meta = {
  component: Copyable,
} satisfies Meta<typeof Copyable>;

type IStory = StoryObj<typeof meta>;

const buttonStyles = stylex.create({
  host: {
    minWidth: '1em',
    height: '1em',
    color: colorRolesVars.primary,
    alignItems: 'center',
  },
  background: {
    // backgroundColor: 'gray',
    borderRadius: shapeVars.corner$full,
  },
  touchTarget: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `calc(100% + 3em)`,
    height: `calc(100% + 3em)`,
    transform: 'translate(-50%, -50%)',
    transformOrigin: 'center',
    // backgroundColor: 'lightgray',
    borderRadius: shapeVars.corner$full,
  },
});

const focusRingStyles = stylex.create({
  host$outward: {
    [focusRingVars.shape]: shapeVars.corner$full,
    inset: 'calc(-0.5em - 0.15em)',
  },
});

const stateLayerStyles = stylex.create({
  host: {
    borderRadius: shapeVars.corner$full,
    inset: '-0.5em',
  },
});

const defaultArgs = {
  children: Date.now().toString(),
  trigger: ({ copy, disabled, setRef }) => (
    <ButtonBase
      // icon={<FontAwesomeIcon icon={faCopy} />}
      ref={setRef}
      onClick={() => copy()}
      disabled={disabled}
      styles={buttonStyles}
      innerStyles={{
        stateLayer: stateLayerStyles,
        focusRing: focusRingStyles,
      }}
    >
      <FontAwesomeIcon icon={faCopy} />
      {/* Click here */}
    </ButtonBase>
  ),
} satisfies Partial<ICopyableProps>;

export const Basic: IStory = {
  render: (props) => (
    <Typography variant='body' size='md'>
      <Copyable {...props} />
    </Typography>
  ),
  args: defaultArgs,
};

export default meta;
