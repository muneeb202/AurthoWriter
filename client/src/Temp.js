import React from "react";
import TextEditor from "./TextEditor";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function Temp(props) {
  let message = "";

  if (props.propValue === undefined) {
    message = "tester";
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<Navigate to={`documents/${message}`} />}
        />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

// function NewPage() {
//   const location = useLocation();
//   const message = new URLSearchParams(location.search).get("message");

//   return (
//     <div>
//       <h1>New Page</h1>
//       <p>{message}</p>
//     </div>
//   );
// // }
export default Temp;
