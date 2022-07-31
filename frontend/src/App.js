import axios from "axios";
import AuthPage from "./pages/AuthPage/AuthPage";

import "./App.scss";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  return (
    <div>
      <AuthPage/>
    </div>
  );
}

export default App;
