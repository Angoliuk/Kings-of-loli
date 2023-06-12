import { useEffect, useState } from 'react';

export const useCountDown = () => {
  const [countDown, setCountDown] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  const stopCountDown = () => {
    setIsStopped(true);
  };

  const continueCountDown = () => {
    setIsStopped(false);
  };

  const setCountDownTime = (seconds: number) => {
    setCountDown(seconds);
  };

  const startCountDown = (seconds: number) => {
    setIsStopped(false);
    setCountDown(seconds);
  };

  useEffect(() => {
    if (isStopped && countDown > 0) return;
    const interval = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return {
    countDown,
    stopCountDown,
    continueCountDown,
    setCountDownTime,
    startCountDown,
  };
};
