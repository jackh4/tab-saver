import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import ToastContainer from '../components/main/toast/ToastContainer';

export type ToastData = {
  id: number;
  message: string;
  type: string;
}

type ToastContextProps = {
  addToast: (message: string, type: string, duration: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: string = 'info', duration: number = 3000) => {
    const id = Date.now();
    const newToast: ToastData = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
