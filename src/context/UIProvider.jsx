import { useState } from 'react';
import { UIContext } from './UIContext';

export const UIProvider = (props1) => {
  const [page, setPage] = useState("Hero");

  return (
    <UIContext.Provider value={{ page, setPage }}>
      {props1.children}
    </UIContext.Provider>
  )
}