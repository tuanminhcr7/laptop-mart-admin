import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Footer from './components/Footer';
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes } from 'react-router-dom';
import Users from './containers/Users';
import Products from './containers/Products';
import NotFoound from './components/NotFound';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/warehouse" element={<Products />} />
        <Route path="*" element={<NotFoound />} />
      </Routes>
    </div>

  );
}

export default App;
