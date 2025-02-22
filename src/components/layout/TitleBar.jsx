import timerLogo from '@/assets/img/timer-countdown-logo.png'
import { Button } from '@/components/ui';
import { IconExpand45, IconMinus, IconX } from 'justd-icons'
import { getCurrentWindow } from "@tauri-apps/api/window";
import AppMenu from '@/components/AppMenu';

const TitleBar = () => {

  const appWindow = getCurrentWindow();
  
  return (
    <>
      <div data-tauri-drag-region className="w-full flex justify-between items-center border-b">
        <div className="select-none">
          <AppMenu />
        </div>
        
        <div className="flex items-center space-x-2 select-none">
          <a href="https://timer-muzakki.vercel.app" className="" target="_blank">
            <img src={timerLogo} className="h-4" alt="" />
          </a>
          <h1 data-tauri-drag-region className="font-semibold text-primary-fg/50 uppercase select-none">Timer Countdown</h1>
        </div>

        <div className="flex">
          <Button
            className="size-8 max-sm:*:data-[slot=icon]:size-3.5 px-5 m-0 rounded-none"
            appearance="plain"

            onPress={async () => {
              try {
                await appWindow.minimize()
              } catch (error) {
                console.error(error.message);
              }
            }}
          >
            <IconMinus className="" />
          </Button>
          <Button
            className="size-8 max-sm:*:data-[slot=icon]:size-3.5 px-5 m-0 rounded-none"
            appearance="plain"

            onPress={async () => {
              try {
                await appWindow.toggleMaximize()
              } catch (error) {
                console.error(error.message);
              }
            }}
          >
            <IconExpand45 className="" />
          </Button>
          <Button
            className="size-8 max-sm:*:data-[slot=icon]:size-3.5 px-5 m-0 rounded-none"
            appearance="plain"
            intent="danger"
            onPress={async () => {
              try {
                await appWindow.close()
              } catch (error) {
                console.error(error.message);
              }
            }}
          >
            <IconX className="" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default TitleBar