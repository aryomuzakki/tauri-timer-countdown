/**
 * Get days, hours, minutes, and seconds of a total seconds.
 * 
 * @param {number} seconds the total seconds (not milliseconds)
 * 
 * @example
 * // return 0, 2, 0, 0
 * const { days, hours, minutes, seconds } = getTimeFromSeconds(7200)
*/
export const getTimeFromSeconds = (secs) => {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    days,
    // allow more than 23 hours
    hours: days > 0 ? hours += days * 24 : hours,
    minutes,
    seconds,
  };
}