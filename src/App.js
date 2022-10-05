import { Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.scss';
import '../src/components/HomePage'
import HomePage from '../src/components/HomePage';
import Menu from './components/menu/Menu';
import Account from './components/account/Account';
import Navbar from './components/nav/Navbar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
