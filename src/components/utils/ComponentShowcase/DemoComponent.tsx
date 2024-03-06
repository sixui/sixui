import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faSocks } from '@fortawesome/free-solid-svg-icons';
import stylex from '@stylexjs/stylex';

export type IDemoComponentProps = {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: 'shirt' | 'socks';
};

const styles = stylex.create({
  color: (color: string) => ({
    color,
  }),
});

export const DemoComponent: React.FC<IDemoComponentProps> = ({
  color = 'lightgray',
  size,
  icon = 'shirt',
}) => (
  <div {...stylex.props(styles.color(color))}>
    <FontAwesomeIcon
      icon={icon === 'shirt' ? faShirt : faSocks}
      size={size === 'sm' ? 'xs' : size === 'lg' ? 'xl' : undefined}
    />
  </div>
);
