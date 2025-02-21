import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui';
import { IconExpand45, IconMinus, IconX } from 'justd-icons'
import { getCurrentWindow } from "@tauri-apps/api/window";

const TitleBar = () => {

  const appWindow = getCurrentWindow();
  
  return (
    <>
      <div data-tauri-drag-region className="w-full flex justify-between items-center border-b">
        <div className="flex items-center space-x-2 pl-4 select-none">
          <a href="https://vite.dev" className="" target="_blank">
            <img src={viteLogo} className="h-4 hover:shadow-f" alt="Vite logo" />
          </a>
          <a href="https://react.dev" className="" target="_blank">
            <img src={reactLogo} className="h-4 hover:shadow-f react" alt="React logo" />
          </a>
          <h1 data-tauri-drag-region className="font-semibold text-primary-fg/50 uppercase select-none">Timer Countdown</h1>
        </div>

        <div className="flex">
          <Button
            className="size-8 max-sm:*:data-[slot=icon]:size-3.5 px-5 m-0 rounded-none"
            appearance="plain"

            onPress={async () => {
              console.log("pressed minimize");

              try {
                await appWindow.minimize()
              } catch (error) {
                console.log(error.message);
              }
            }}
          >
            <IconMinus className="" />
          </Button>
          <Button
            className="size-8 max-sm:*:data-[slot=icon]:size-3.5 px-5 m-0 rounded-none"
            appearance="plain"

            onPress={async () => {
              console.log("pressed maximize toggle");

              try {
                await appWindow.toggleMaximize()
              } catch (error) {
                console.log(error.message);
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
              console.log("pressed close");

              try {
                await appWindow.close()
              } catch (error) {
                console.log(error.message);
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