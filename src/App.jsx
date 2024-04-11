// import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Backend from './component/layouts/backend/Backend';
// import LoginLayout from './component/layouts/login/LoginLayout';
// import { Outlet, Route } from 'react-router-dom';
import Routess from './routes';
import { BrowserRouter as Router } from "react-router-dom";
let logintrue = false
logintrue = localStorage.getItem('logintrue', false)


function App() {
  return (
    <>
      {/* <Router>
        <Routess />
      </Router> */}
      <Login />
    </>
  )
}

export default App
