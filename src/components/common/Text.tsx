import { MouseEventHandler } from "react";

type TextProps = {
  text?: string;
  size?: string;
  color?: string;
  tooltipText?: string;
  onClick?: MouseEventHandler;
}

const Text = ({
  text,
  size,
  color,
  tooltipText,
  onClick,
}: TextProps) => {
  const textStyle = {
    fontSize: size,
    color,
  }
  
  return (
    <div style={textStyle} title={tooltipText} onClick={onClick}>
      {text}
    </div>
  )
}

export default Text;