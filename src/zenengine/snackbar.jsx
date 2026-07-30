import { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import './snackbar.css';

export default function Snackbar({ message, duration, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false)
      const closeEvent = setTimeout(() => {
        onClose()
      }, 500);
      return () => clearTimeout(closeEvent);
    }, duration);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className={`snackbar ${visible ? 'show' : ''}`}>
      <IoCheckmarkCircle className='text-accent' size={28} />
      <span>{message}</span>
    </div>
  );
}