import TextEditor from "./TextEditor";
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom';
import TempComp from "./Temp";
import {v4 as uuidV4} from 'uuid'



function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" exact element={<Navigate to = {`documents/${uuidV4()}`} />}/>
          <Route path="/documents/:id" element={<TextEditor />}/>
        </Routes>
      </Router>
    </div>    
    // <TextEditor/>
  );
}

export default App;
