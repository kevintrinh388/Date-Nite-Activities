import { toast } from 'react-toastify';

export const TOAST_ERROR = 'TOAST_ERROR';
export const TOAST_SUCCESS = 'TOAST_SUCCESS';

const showToast = (text, type) => {
  if (type === TOAST_ERROR) {
    toast.error(text, {
      toastId: 'error',
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(text, {
      toastId: 'success',
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default showToast;
