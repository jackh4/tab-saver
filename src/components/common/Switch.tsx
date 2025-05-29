import { CSSProperties } from 'react';
import './styles/Switch.css';

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  height?: string;
  width?: string;
  offset?: string;
  round?: boolean;
};

const Switch = ({
  checked,
  defaultChecked,
  onChange,
  height = '16px',
  width = '32px',
  offset = '2px',
  round = false,
}: SwitchProps) => {
  const sliderSize = `calc(${height} - 2 * ${offset})`;
  const translateX = `calc(${width} - ${height})`;

  const sliderStyle: CSSProperties = {
    height,
    width,
    '--slider-size': sliderSize,
    '--slider-offset': offset,
    '--slider-translate-x': translateX,
  } as CSSProperties;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className='switch' style={{ width, height }}>
      <input
        type='checkbox'
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
      <span className={`slider ${round ? 'round' : ''}`} style={sliderStyle} />
    </label>
  );
};

export default Switch;
