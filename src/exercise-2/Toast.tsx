import { type ComponentProps } from 'react';
import { Dialog } from './Dialog';

export type ToastType = 'error' | 'info' | 'success' | 'warning' | undefined;

export type ToastProps = Omit<
  ComponentProps<'dialog'>,
  'style' | 'className' | 'open'
> & {
  close: () => void;
  isVisible: boolean;
  text: string;
  type: ToastType;
};

export function Toast({
  close,
  id,
  isVisible,
  text,
  type,
  ...otherProps
}: ToastProps) {
  const ariaDescription = `${id}-description`;

  const backgroundColorMap = new Map([
    ['error', 'lightcoral'],
    ['info', 'lightblue'],
    ['success', 'lightgreen'],
    ['warning', 'lightsalmon'],
  ]);

  return (
    <Dialog
      {...otherProps}
      aria-label={`${type} toast`}
      aria-describedby={ariaDescription}
      id={id}
      open={isVisible}
      style={{
        backgroundColor: type ? backgroundColorMap.get(type) : undefined,
        bottom: '1rem',
        position: 'fixed',
        width: '400px',
      }}
    >
      <Dialog.Body
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <p id={ariaDescription} style={{ margin: 0 }}>
          {text}
        </p>
        <button onClick={close} title="Close">
          ❌
        </button>
      </Dialog.Body>
    </Dialog>
  );
}
