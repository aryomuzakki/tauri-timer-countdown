import { getTimeFromSeconds } from '@/utils/time'
import NumberFlow from '@number-flow/react'
import { useEffect } from 'react'

const Countdown = ({
  initialSeconds,
  setInitialSeconds,
  totalSeconds,
  setTotalSeconds,
  isPlaying,
  setIsPlaying,
  setIsFinish,
  onFinish
}) => {

  const { hours: iHours } = getTimeFromSeconds(initialSeconds);
  const { hours, minutes, seconds } = getTimeFromSeconds(totalSeconds);

  useEffect(() => {
    let ticking;

    if (isPlaying) {
      setTotalSeconds(--totalSeconds);
      ticking = setInterval(() => {
        setTotalSeconds(--totalSeconds);
        if (totalSeconds === 0) {
          clearInterval(ticking);
          setIsFinish(true);
          onFinish();
        }
      }, 1000);
    } else {
      clearInterval(ticking);
    }

    return () => {
      clearInterval(ticking);
    }
  }, [isPlaying])

  return (
    <div className={`${iHours > 0 ? "text-7xl" : "text-9xl"} w-96 h-48 font-bold flex items-center justify-center overflow-hidden`}>
      {iHours > 0 && (
        <>
          <NumberFlow value={hours} format={{ minimumIntegerDigits: 2 }} className="mx-2" />
          <span className="mb-6">:</span>
        </>
      )}
      <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} className="mx-2" />
      <span className="mb-6">:</span>
      <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} className="mx-2" />
    </div>
  )
}

export default Countdown