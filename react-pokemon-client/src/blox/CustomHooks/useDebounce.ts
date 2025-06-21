import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    // 1️⃣ On every change of `value` (or `delay`), schedule a timer…
    const timer = setTimeout(() => {
      // …that, after `delay` ms, updates the debounced state
      setDebounced(value);
    }, delay);

    // 2️⃣ But if `value` changes *again* before the timer fires,
    //    React runs this cleanup, cancelling the previous timer:
    return () => clearTimeout(timer);
  }, [value, delay]); // ← this effect re-runs whenever `value` or `delay` changes

  //Until the timer finally fires, `debounced` remains at its old value.
  return debounced;
}