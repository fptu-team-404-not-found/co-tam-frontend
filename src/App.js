import { Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.scss';
import '../src/components/HomePage'
import HomePage from '../src/components/HomePage';
import Menu from './components/menu/Menu';
import Account from './components/account/AccountHouseWorker';
import Navbar from './components/nav/Navbar';
import Service from './components/service/Service';
import Promotion from './components/promotion/Promotion';
import Building from './components/building/Building';
import Area from './components/area/Area';
import Configuration from './components/configuration/Configuration';
import AccountHouseWorker from './components/account/AccountHouseWorker';
import AccountCustomer from './components/account/AccountCustomer';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AccountHouseWorker />} />
        <Route path='/accountcustomer' element={<AccountCustomer />}/>
        <Route path='/accounthouseworker' element={<AccountHouseWorker />}/>
        <Route path='/service' element={<Service />}/>
        <Route path='/promotion' element={<Promotion />}/>
        <Route path='/building' element={<Building />}/>
        <Route path='/area' element={<Area />}/>
        <Route path='/configuration' element={<Configuration />}/>
      </Routes>
    </>
  );
}

export default App;
