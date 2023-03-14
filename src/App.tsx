import { Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Login from './pages/Login';
import NavBar from './components/NavBar'
import Table from './pages/Table'
import Status from './pages/Status'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Stock from './pages/Stock'
import Vendas from './pages/Vendas'
import Reports from './pages/Reports'
import SideBar from './components/SideBar'

import { useState } from 'react';

import { Context } from "./contexts/Context";
import { Stack } from '@chakra-ui/react';

const App = () => {
  const [context, setContext] = useState(false);



  return (
    <>
      <Context.Provider value={{ context, setContext }}>
        {context ? <SideBar >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login/calendar" element={<Calendar />} />
            <Route path="/login/table" element={<Table />} />
            <Route path="/status" element={<Status />} />
            <Route path="/form/status" element={<Status />} />
            <Route path="/login/settings" element={<Settings />} />
            <Route path="/login/stock" element={<Stock />} />
            <Route path="/login/vendas" element={<Vendas />} />
            <Route path="/login/reports" element={<Reports />} />
          </Routes>
        </SideBar> :

          <Stack>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/login" element={<Login />} />
              <Route path="/status" element={<Status />} />
            </Routes>
          </Stack>
        }
      </Context.Provider>
    </>
  );
};

export default App;