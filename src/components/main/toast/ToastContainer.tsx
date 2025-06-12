import './styles/ToastContainer.css';
import { ToastData } from '../../../contexts/ToastContext';

type ToastContainerProps = {
  toasts: ToastData[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className='toast-container'>
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast toast-${type}`}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
