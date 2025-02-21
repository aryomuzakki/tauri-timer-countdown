import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'

const WebHeader = () => {
  return (
    <div className="w-full flex justify-center items-center border-b h-12">
      
      <div className="flex items-center space-x-2 pl-4 select-none">
        <a href="https://vite.dev" className="" target="_blank">
          <img src={viteLogo} className="h-6" alt="Vite logo" />
        </a>
        <a href="https://react.dev" className="" target="_blank">
          <img src={reactLogo} className="h-6" alt="React logo" />
        </a>
        <h1 className="font-semibold text-primary-fg/50 uppercase select-none">Timer Countdown</h1>
      </div>

    </div>
  )
}

export default WebHeader