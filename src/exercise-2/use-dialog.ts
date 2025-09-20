import { useRef } from 'react';

export function useDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  // Exercise 2 - spec 1 & 3
  function openDialog() {
    if (!ref.current) {
      return;
    }

    ref.current.show();
  }

  // Exercise 2 - spec 1 & 3
  function openModal() {
    if (!ref.current) {
      return;
    }

    ref.current.showModal();
  }

  // Exercise 2 - spec 1 & 3
  function close() {
    if (!ref.current) {
      return;
    }

    ref.current.close();
  }

  return {
    close,
    openDialog,
    openModal,
    ref,
  };
}
