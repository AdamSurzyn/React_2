import React from "react";
import "./App.css";
import InputForm from "./components/inputForm";
import ProtectedWrapper from "./components/protectedWrapper";

function App() {
  return (
    <div className="App">
      <ProtectedWrapper>
        <InputForm></InputForm>
      </ProtectedWrapper>
    </div>
  );
}
export default App;
