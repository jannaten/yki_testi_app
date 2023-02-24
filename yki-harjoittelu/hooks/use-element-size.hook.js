import { useState, useEffect } from 'react';

export default function useElementSize(ref) {
  const [size, setSize] = useState({});

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) =>
      setSize(entry.contentRect)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current]);

  return size;
}
