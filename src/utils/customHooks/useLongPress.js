import { useRef } from "react";

export function useLongPress(click, flag) {
  const timerRef = useRef(null);
  const isLongPress = useRef(false);
  const startPressTimer = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;

      flag();
    }, 700);
  };
  const onMouseDown = () => {
    startPressTimer();
  };
  const onTouchStart = (e) => {
    e.preventDefault();
    startPressTimer();
  };
  const onMouseUp = () => {
    clearTimeout(timerRef.current);
  };
  const onTouchEnd = () => {
    clearTimeout(timerRef.current);
  };
  const onClick = (e) => {
    if (isLongPress.current) {
      e.preventDefault();
      return;
    }
    click();
  };
  return {
    onMouseDown,
    onTouchStart,
    onMouseUp,
    onTouchEnd,
    onClick,
  };
}
