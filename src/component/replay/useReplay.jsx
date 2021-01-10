import React, { useState } from 'react';

export const ReplayContext = React.createContext();

export default function ReplayProvider ({children}) {
  const [gameData,setGameData] = useState();
  return (
    <ReplayContext.Provider value = {{gameData,setGameData}}>{children}</ReplayContext.Provider>
  )
}