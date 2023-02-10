import { Routes, Route } from 'react-router-dom';
import Form from './Pages/Form';
import Login from './Pages/Login';
import NavBar from './Components/NavBar'
import Table from './Pages/Table'
import Status from './Pages/Status'


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/table" element={<Table />} />
        <Route path="/status" element={<Status />} />

      </Routes>
    </>
  );
};

export default App;