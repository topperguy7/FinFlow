import { useState , useContext } from 'react'
import { UIContext } from './context/UIContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Transactions } from './components/Transactions'
import { Dashboard } from './components/Dashboard'
import { Insights } from './components/Insights'

function App() {
  const {page} = useContext(UIContext);

  return (
    <>
      <Navbar/>

      <div className='mt-10 w-fit mx-auto'>
        {page === "Hero" && <Hero/>}
        {page === "Dashboard" && <Dashboard/>}
        {page === "Transactions" && <Transactions/>}
        {page === "Insights" && <Insights/>}
      </div>
    </>
  )
}

export default App
