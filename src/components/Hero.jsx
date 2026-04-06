import { useContext } from "react"
import { UIContext} from '../context/UIContext'
import demo from '../assets/demo.mp4'

export function Hero(){
  const { setPage } = useContext(UIContext);

  return (
    <>
      <div className="mt-30 p-2">

        <div className="text-center">
          <h1 className="text-3xl md:text-7xl leading-tight">
            Manage Your <span className="text-[var(--bg1)] font-semibold">Money</span><br/><span className="text-[var(--bg1)] font-semibold">Smarter </span> 
            With Insights<br/> That <span className="text-[var(--bg1)] font-semibold">Matter</span> Most
          </h1>
          <p className="text-sm md:text-base px-10 md:px-2 text-gray-600">
            Track income, monitor expenses, and gain powerful insights with <span className="text-[var(--bg1)] font-semibold border-b">FinFlow</span>.<br/> 
            Built for individuals who want full control of their finances.
          </p>
        </div>

        <div className="mt-10 text-center">

          <button 
          className="bg-[var(--btn)] font-medium mb-4 md:mb-0 md:mr-6 px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-2xl text-4xl md:text-5xl 
          transition-all ease-in-out duration-200 hover:shadow-[5px_5px_30px_var(--btn)] hover:text-red-200 hover:-translate-y-1 active:scale-96 cursor-pointer group"
          onClick={() => setPage("Dashboard")}
          >Try Now <span className="transition-all duration-200 group-hover:text-red-200">⮞</span></button>

        </div>

        <div className="mt-10 flex justify-center flex-wrap gap-4 text-sm md:text-xl">
          <h1 className="bg-[var(--bg1)] p-2 rounded-md shadow-xl">⚡ Real-time Insights</h1>
          <h1 className="bg-[var(--bg1)] p-2 rounded-md shadow-xl">📊 Smart Dashboard</h1>
          <h1 className="bg-[var(--bg1)] p-2 rounded-md shadow-xl">💾 Works offline (LS)</h1>
          <h1 className="bg-[var(--bg1)] p-2 rounded-md shadow-xl">🔄 Seamless Flow</h1>
        </div>

        <div className="mt-14 mb-4 m-6 md:p-4 text-center">
          <h1 className="text-4xl mb-4 font-semibold">Demo</h1>
          <video src={demo} type="video/mp4" className="w-120 md:w-240 border-2" controls/>
        </div>

      </div>
    </>
  )
}