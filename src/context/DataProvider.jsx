import { useState , useEffect } from "react";
import { DataContext } from "./DataContext";

export const DataProvider = (props) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("data");

    if(!stored) return [];

    try{
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
    catch {
      return [];
    };
  });

  const [ role , setRole ] = useState("Admin");

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return(
    <DataContext.Provider value={{data, setData, role, setRole}}>
      {props.children}
    </DataContext.Provider>
  )
}