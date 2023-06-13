export const getTimeFormat = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    (minutes > 9 ? minutes.toString() : '0' + minutes.toString()) +
    ':' +
    (seconds > 9 ? seconds.toString() : '0' + seconds.toString()).toString()
  );
};
