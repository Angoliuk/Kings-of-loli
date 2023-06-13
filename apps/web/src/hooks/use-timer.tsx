import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const [isStopped, setIsStopped] = useState(true);

  const stopTimer = () => {
    setIsStopped(true);
  };

  const continueTimer = () => {
    setIsStopped(false);
  };

  const setTimerTime = (seconds: number) => {
    setTimer(seconds);
  };

  const startTimer = (seconds = 0) => {
    setIsStopped(false);
    setTimer(seconds);
  };

  useEffect(() => {
    if (isStopped) return;
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return {
    timer,
    stopTimer,
    continueTimer,
    setTimerTime,
    startTimer,
  };
};
