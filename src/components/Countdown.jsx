import NumberFlow from '@number-flow/react'
import { useEffect } from 'react'

const Countdown = ({ totalSeconds, setTotalSeconds, isPlaying, setIsPlaying, setIsFinish, onFinish }) => {

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
    <div className="text-9xl w-max font-bold flex items-center justify-center overflow-hidden">
      <NumberFlow value={Math.floor(totalSeconds / 60)} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} className="mx-2" />
      <span className="mb-6">:</span>
      <NumberFlow value={Math.floor(totalSeconds % 60)} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} className="mx-2" />
    </div>
  )
}

export default Countdown