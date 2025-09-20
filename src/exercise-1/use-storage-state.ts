import { useEffect, useRef, useSyncExternalStore } from 'react';

type Listener = () => void;

const listeners = new Set<Listener>();

function getSnapshot(key: string) {
  return localStorage.getItem(key);
}

// Exercise 1 - spec 2
function subscribe(listener: Listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function parseRawValue<T>(rawValue: string | null): T | null {
  if (rawValue === null) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return rawValue as T;
  }
}

export function useStorageState<T>(key: string) {
  const previousRawValue = useRef<string | null>(null);

  // Exercise 1 - spec 3
  const rawValue = useSyncExternalStore<string | null>(
    subscribe,
    () => getSnapshot(key),
    () => getSnapshot(key),
  );

  const value = parseRawValue<T>(rawValue);

  // Exercise 1 - spec 1
  function setValue(newValue: T | null) {
    try {
      const value = JSON.stringify(newValue);
      previousRawValue.current = value;
      localStorage.setItem(key, value);
      listeners.forEach((listener) => listener());
    } catch (error) {
      console.error(`Value can't be stored : ${error}`);
    }
  }

  // Exercise 1 - spec 4
  // NOTE: polling to handle localStorage changes from other tabs and console
  // but if only changes from other tabs needed, the "storage" event can be used instead
  useEffect(() => {
    const interval = setInterval(() => {
      const latestRawValue = getSnapshot(key);

      if (latestRawValue !== previousRawValue.current) {
        previousRawValue.current = latestRawValue;
        listeners.forEach((listener) => listener());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [key]);

  return { value, setValue };
}
