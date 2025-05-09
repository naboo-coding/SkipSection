import React, { createContext, useContext } from "react";
import Header from "./components/Header";
import SkipList from "./components/SkipList";
import "./App.css";
import { useIsMobile } from "./hooks/useIsMobile";

export const DeviceContext = createContext({ isMobile: false });
export const useDevice = () => useContext(DeviceContext);

function App() {
  const isMobile = useIsMobile();
  return (
    <DeviceContext.Provider value={{ isMobile }}>
      <div className="app-root">
        <Header currentStep={2} isMobile={isMobile} />
        <SkipList />
      </div>
    </DeviceContext.Provider>
  );
}

export default App; 