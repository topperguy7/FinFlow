import { useState , useEffect , useContext } from "react";
import { DataContext } from "../context/DataContext";
import { UIContext } from "../context/UIContext";
import logo from '../assets/logo.png'

export function Navbar(){
  const { setPage } = useContext(UIContext);
  const { role , setRole }  = useContext(DataContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [roledrop, setRoledrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark"){
      root.classList.add("dark");
    }
    else{
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return(
    <>
      <div  className="navbar-comp flex md:justify-center justify-between items-center md:mx-auto md:w-fit gap-12 p-3 md:rounded-xl md:shadow-[0px_5px_10px_2px_rgba(0,0,0,0.5)] transition-colors ease-in-out duration-200">
        <h1 onClick={() => setPage("Hero")} className="md:text-[1.5rem] text-[1.3rem] font-bold border-b-2 flex gap-1 items-center cursor-pointer"><img src={logo} alt='finflow logo' className="w-6 h-6"/>FinFlow</h1>
        
        <div className="hidden md:flex gap-12">
          <div className="flex gap-4">
            <button 
            className="border-2 rounded-lg p-2 shadow-[0px_5px_10px_2px_rgba(0,0,0,0.5)] cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
            onClick={() => setPage("Dashboard")}
            >Dashboard</button>
            <button 
            className="border-2 rounded-lg p-2 shadow-[0px_5px_10px_2px_rgba(0,0,0,0.5)] cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
            onClick={() => setPage("Transactions")}
            >Transactions</button>
            <button 
            className="border-2 rounded-lg p-2 shadow-[0px_5px_10px_2px_rgba(0,0,0,0.5)] cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
            onClick={() => setPage("Insights")}
            >Insights</button>
          </div>

          <div className="relative" onMouseEnter={() => setRoledrop(true)} onMouseLeave={() => setRoledrop(false)}>
            <div>
              <span>Role:</span>
              <button 
              className="border-2 rounded-lg p-2">{role}🔽</button>
            </div>

            {roledrop && (<div className="role-drop absolute top-10 left-10 text-center border-x-1 border-b-1">
              <button className="p-1 cursor-pointer" onClick={() => setRole("Admin")}>Admin</button>
              <button className="p-1 cursor-pointer" onClick={() => setRole("User")}>User</button>
            </div>)}
          </div>
        </div>

        <div className="flex gap-4">
          <button className="border-2 rounded-lg p-2 cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
          onClick={() => {setTheme(prev => (prev === "light" ? "dark" : "light"))}}
          >{theme === "light" ? "🌙" : "☀️"}</button>

          <button 
          className="md:hidden text-2xl cursor-pointer active:scale-95 transition-all ease-in-out duration-200"
          onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          {menuOpen && (
          <>
            <div
              className="fixed md:hidden w-screen h-screen inset-0 bg-black/40 z-[9999]"
              onClick={() => setMenuOpen(false)}
            />

            <div className="navbar-comp md:hidden fixed h-screen w-[220px] z-[9999] shadow-2xl top-0 right-0 p-4 flex flex-col gap-8">
                
              <button
              className="text-right mt-2 text-2xl" 
              onClick={() => setMenuOpen(!menuOpen)}>✕</button>

              <div className="flex flex-col gap-8">
                <button className="border-2 rounded-lg p-2 cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
                onClick={() => {setPage("Dashboard"); setMenuOpen(false)}}
                >Dashboard</button>
                <button className="border-2 rounded-lg p-2 cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
                onClick={() => {setPage("Transactions"); setMenuOpen(false);}}
                >Transactions</button>
                <button className="border-2 rounded-lg p-2 cursor-pointer hover:-translate-y-0.5 active:scale-96 transition-all ease-in-out duration-200"
                onClick={() => {setPage("Insights"); setMenuOpen(false);}}
                >Insights</button>
              </div>

              <div className="relative" onMouseEnter={() => setRoledrop(true)} onMouseLeave={() => setRoledrop(false)}>
                <div>
                  <span>Role:</span>
                  <button 
                  className="border-2 rounded-lg p-2">{role}🔽</button>
                </div>

                {roledrop && (
                  <div className="role-drop flex flex-col gap-2 absolute top-10 left-10 text-center border-x-1 border-b-1">
                  
                  <button className="p-1 cursor-pointer" onClick={() => setRole("Admin")}>Admin</button>
                  <button className="p-1 cursor-pointer" onClick={() => setRole("User")}>User</button>
                  
                  </div>)}
              </div>

            </div>
            
          </>)}
          
        </div>
      </div>
    </>
  );
};