import { useEffect, useState } from 'react'
import '@/App.css'
import Countdown from '@/components/Countdown'
import { Button, Toast } from '@/components/ui'
import { toast } from 'sonner'
import TitleBar from '@/components/layout/TitleBar'
import { isTauriDesktop, isWeb } from '@/utils/isTauri'
import WebHeader from './components/layout/WebHeader'
import { getTimeFromSeconds } from './utils/time'
import { TimeNumberField } from './components/TimeNumberField'

function App() {
  const DEFAULT_TOTALSECONDS = 60;

  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinish, setIsFinish] = useState(null)
  const [initialSeconds, setInitialSeconds] = useState(DEFAULT_TOTALSECONDS)
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds)

  const { hours: tHours, minutes: tMinutes, seconds: tSeconds } = getTimeFromSeconds(initialSeconds);

  const hoursChange = (hourVal) => {
    const newTotalSeconds = (hourVal * 60 * 60 + tMinutes * 60 + tSeconds) || 0;
    if (newTotalSeconds < 0) return;
    if (newTotalSeconds > (1000 * 60 * 60) - 1) return;
    setInitialSeconds(newTotalSeconds);
    setTotalSeconds(newTotalSeconds);
  }
  const minutesChange = (min) => {
    const newTotalSeconds = (tHours * 60 * 60 + min * 60 + tSeconds) || 0;
    if (newTotalSeconds < 0) return;
    if (newTotalSeconds > (1000 * 60 * 60) - 1) return;
    setInitialSeconds(newTotalSeconds);
    setTotalSeconds(newTotalSeconds);
  }
  const secondsChange = (sec) => {
    const newTotalSeconds = (tHours * 60 * 60 + tMinutes * 60 + sec) || 0;
    if (newTotalSeconds < 0) return;
    if (newTotalSeconds > (1000 * 60 * 60) - 1) return;
    setInitialSeconds(newTotalSeconds);
    setTotalSeconds(newTotalSeconds);
  }

  if (isTauriDesktop) {
    useEffect(() => {
      const disableContextMenu = (ev) => {
        ev.preventDefault();
        document.getElementById("context-menu-btn").click();
      }
      document.addEventListener('contextmenu', disableContextMenu);

      return () => {
        document.removeEventListener('contextmenu', disableContextMenu);
      }
    }, [])

  }

  return (
    <>
      <Toast duration={Infinity} />

      <div data-tauri-drag-region className="relative w-full h-dvh overflow-hidden">

        <div data-tauri-drag-region className="relative flex h-full w-full flex-col justify-between">

          {isTauriDesktop && <TitleBar />}
          {isWeb && <WebHeader />}

          <div data-tauri-drag-region className="border rounded-xs w-max my-4 mx-auto px-8 pb-2 pointer-events-none select-none">
            <Countdown
              initialSeconds={initialSeconds}
              totalSeconds={totalSeconds}
              setTotalSeconds={setTotalSeconds}
              isPlaying={isPlaying}
              setIsFinish={setIsFinish}
              onFinish={() => {
                setIsPlaying(false);
                toast.error("Time's Up", { position: "top-center", });
              }}
            />
          </div>

          <div data-tauri-drag-region className="w-full gap-x-8 gap-y-4 flex flex-col sm:flex-row justify-center items-center pb-4 select-none">
            <div className="flex space-x-4">

              <Button
                size="small"
                appearance="outline"
                className="disabled:opacity-15 opacity-40 not-disabled:hover:opacity-100 transition rounded-sm uppercase tracking-wider w-20 px-0"
                onPress={() => {
                  setIsPlaying(!isPlaying)
                  toast.dismiss();
                }}
                {...totalSeconds < 2 ? { isDisabled: true } : {}}
              >
                {isPlaying ? "Pause" : (totalSeconds < 2 || !(totalSeconds < initialSeconds)) ? "Start" : "Resume"}
              </Button>
              <Button
                size="small"
                appearance="outline"
                className="disabled:opacity-15 opacity-40 not-disabled:hover:opacity-100 transition rounded-sm uppercase tracking-wider"
                onPress={() => {
                  setIsFinish(null);
                  setTotalSeconds(initialSeconds);
                }}
                {...isPlaying ? { isDisabled: true } : {}}
              >
                Reset
              </Button>
            </div>

            <div className={`flex space-x-2  ${isPlaying || (totalSeconds < initialSeconds) ? "opacity" : ""}`}>
              <TimeNumberField
                aria-label="set hours"
                className="transition not-disabled:opacity-40 not-disabled:has-focus:opacity-100 not-disabled:hover:opacity-100 has-disabled:opacity-0 has-disabled:hover:opacity-0"
                value={tHours}
                onChange={hoursChange}
                {...(isPlaying || (totalSeconds < initialSeconds)) ? { isDisabled: true } : {}}
              />
              <TimeNumberField
                aria-label="set minutes"
                className="transition not-disabled:opacity-40 not-disabled:has-focus:opacity-100 not-disabled:hover:opacity-100 has-disabled:opacity-0 has-disabled:hover:opacity-0"
                value={tMinutes}
                onChange={minutesChange}
                {...(isPlaying || (totalSeconds < initialSeconds)) ? { isDisabled: true } : {}}
              />
              <TimeNumberField
                aria-label="set seconds"
                className="transition not-disabled:opacity-40 not-disabled:has-focus:opacity-100 not-disabled:hover:opacity-100 has-disabled:opacity-0 has-disabled:hover:opacity-0"
                value={tSeconds}
                onChange={secondsChange}
                {...(isPlaying || (totalSeconds < initialSeconds)) ? { isDisabled: true } : {}}
              />
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
