import { isTauriDesktop } from "@/utils/isTauri"
import { Button } from "./ui"
import TitleBar from "./layout/TitleBar"

const RootError = ({ error, resetErrorBoundary }) => {
  return (
    <>
      {isTauriDesktop && <TitleBar />}
      <div data-tauri-drag-region className="h-dvh w-full flex flex-col justify-center items-center space-y-4">
        <p>
          Upss~🙊 Something went wrong!
        </p>
        <p className="">
          {error.message}
        </p>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </>
  )
}

export default RootError