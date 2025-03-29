import React, { Fragment } from "react";
import "./App.css";
import Exams from "./components/Exams"; // Ensure this matches your actual file name

function App() {
  return (
    <Fragment>
      <div className="container">
        <Exams />
      </div>
    </Fragment>
  );
}

export default App;