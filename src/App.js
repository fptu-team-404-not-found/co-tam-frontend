import { Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './_App.scss';
import '../src/components/HomePage'
import HomePage from '../src/components/HomePage';
import Menu from './components/menu/Menu';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Menu />} />
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
