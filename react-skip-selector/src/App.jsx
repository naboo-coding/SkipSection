import React from "react";
import Header from "./components/Header";
import SkipList from "./components/SkipList";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Header currentStep={2} />
      <SkipList />
    </div>
  );
}

export default App; 