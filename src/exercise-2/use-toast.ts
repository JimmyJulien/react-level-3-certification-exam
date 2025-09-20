import { useRef, useState } from 'react';
import type { ToastProps } from './Toast';

export function useToast() {
  const id = '1';

  const ref = useRef<HTMLDialogElement>(null);

  function openDialog() {
    if (!ref.current) {
      return;
    }

    ref.current.show();
  }

  function close() {
    if (!ref.current) {
      return;
    }

    ref.current.close();
  }

  const [toastProps, setToastProps] = useState<ToastProps>({
    close,
    text: '',
    id,
    ref: undefined,
    type: 'success',
  });

  function showToast({
    text,
    type,
  }: {
    text: string;
    type: ToastProps['type'];
  }) {
    setToastProps({
      close,
      text,
      id,
      ref,
      type,
    });

    openDialog();
  }

  function hideToast() {
    close();
  }

  return {
    showToast,
    hideToast,
    toastProps,
    toastRef: ref,
  };
}
