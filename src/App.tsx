import { Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Login from './pages/Login';
import NavBar from './components/NavBar'
import Table from './pages/Table'
import Status from './pages/Status'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import { useState } from 'react';


const App = () => {
  const [auth, setAuth] = useState(false);
  

  return (
    <>
      <NavBar auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/calendar" element={<Calendar />} />
        <Route path="/login/table" element={<Table setAuth={setAuth}/>} />
        <Route path="/status" element={<Status />} />
        <Route path="/form/status" element={<Status />} />
      </Routes>
    </>
  );
};

export default App;