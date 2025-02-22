import timerLogo from '@/assets/img/timer-countdown-logo.png'

const WebHeader = () => {
  return (
    <div className="w-full flex justify-center items-center border-b h-12">

      <div className="flex items-center space-x-2 pl-4 select-none">
        <a href="https://timer-muzakki.vercel.app" className="" target="_blank">
          <img src={timerLogo} className="h-4" alt="" />
        </a>
        <h1 className="font-semibold text-primary-fg/50 uppercase select-none">Timer Countdown</h1>
      </div>

    </div>
  )
}

export default WebHeader