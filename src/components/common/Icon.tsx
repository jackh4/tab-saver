import { CSSProperties, MouseEventHandler } from 'react';
import './styles/Icon.css';

type IconProps = {
  materialIconName: string;
  onClick?: MouseEventHandler;
  tooltipText?: string;
  iconColor?: string;
  hoverColor?: string;
  varIconColor?: string;
  varHoverColor?: string;
  style?: CSSProperties;
}

const Icon = ({
  materialIconName,
  onClick,
  tooltipText,
  iconColor,
  hoverColor,
  varIconColor,
  varHoverColor,
  style,
}: IconProps) => {

  return (
    <div
      title={tooltipText}
      onClick={onClick}
      className='icon-container'
      style={{ 
        ...style, 
        // can take any color or take defined variables from css
        ...(iconColor && { '--text-color': iconColor }),
        ...(varIconColor && { '--text-color': `var(${varIconColor})` }),
        ...(hoverColor && { '--hover-color': hoverColor }),
        ...(varHoverColor && { '--hover-color': `var(${varHoverColor})` }),
      } as CSSProperties}
    >
      <span className='material-symbols-outlined'>
        {materialIconName}
      </span>
    </div>
  );
};

export default Icon;
