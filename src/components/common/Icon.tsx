import './Icon.css';

type IconProps = {
  type: string;
}

const Icon = ({
  type,
}: IconProps) => {

  const hoverColor = type === 'delete'

  return (
    <div
      className='icon-container'
    >
      {hoverColor}
    </div>
  )
}

export default Icon;