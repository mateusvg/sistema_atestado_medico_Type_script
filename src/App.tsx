import { Routes, Route } from 'react-router-dom';
import Form from './Pages/Form';
import Login from './Pages/Login';
import NavBar from './components/NavBar'
import Table from './Pages/Table'
import Status from './Pages/Status'
import Home from './Pages/Home'
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
        <Route path="/login/table" element={<Table setAuth={setAuth}/>} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </>
  );
};

export default App;