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
import AccountInformationCustomer from './components/account/AccountInformationCustomer';
import AccountInformationHouseworker from './components/account/AccountInformationHouseworker';
import CreateNewArea from './components/area/CreateNewArea';
import CreateNewBuilding from './components/building/CreateNewBuilding';
import CreateNewPromotion from './components/promotion/CreateNewPromotion';
import CreateNewService from './components/service/CreateNewService';
import AccountManager from './components/account/AccountManager';
import Order from './components/order/Order';
import Login from './components/login/Login';
import { setAuthToken } from './setAuthToken';

function App() {
  //check jwt token
 const token = localStorage.getItem("token");
 if (token) {
     setAuthToken(token);
 }
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/accountmanager' element={<AccountManager />} />
        <Route path='/accountcustomer' element={<AccountCustomer />}/>
        <Route path='/accounthouseworker' element={<AccountHouseWorker />}/>
        <Route path='/service' element={<Service />}/>
        <Route path='/createnewservice' element={<CreateNewService />}/>
        <Route path='/createnewpromotion' element={<CreateNewPromotion />}/>
        <Route path='/createnewbuilding' element={<CreateNewBuilding />}/>
        <Route path='/promotion' element={<Promotion />}/>
        <Route path='/building' element={<Building />}/>
        <Route path='/area' element={<Area />}/>
        <Route path='/createnewarea' element={<CreateNewArea />}/>
        <Route path='/configuration' element={<Configuration />}/>
      </Routes>
    </>
  );
}

export default App;
