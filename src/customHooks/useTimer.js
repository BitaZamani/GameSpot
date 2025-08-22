import { useEffect, useState } from "react";

export function useTimer(end) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (end) return;
    const start = Date.now() - seconds * 1000;
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [end, seconds]);
  return { seconds, setSeconds };
}
