import { useRef, useState } from 'react';
import type { ToastProps } from './Toast';

export function useToast() {
  const id = useRef<string>(`toast-${crypto.randomUUID()}`);

  const ref = useRef<HTMLDialogElement>(null);

  const [toastProps, setToastProps] = useState<ToastProps>({
    close: hideToast,
    id: id.current,
    isVisible: false,
    ref,
    text: '',
    type: undefined,
  });

  function showToast({
    text,
    type,
  }: {
    text: string;
    type: ToastProps['type'];
  }) {
    setToastProps((actualProps) => ({
      ...actualProps,
      isVisible: true,
      text,
      type,
    }));
  }

  function hideToast() {
    setToastProps((actualProps) => ({
      ...actualProps,
      isVisible: false,
    }));
  }

  return {
    showToast,
    hideToast,
    toastProps,
    toastRef: ref,
  };
}
