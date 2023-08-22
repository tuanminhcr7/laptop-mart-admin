import Cookies from 'js-cookie';
import { Container } from 'react-bootstrap';
import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Footer from './components/Footer';
import { BrowserRouter, Navigate, Outlet, Route, Router, Routes } from 'react-router-dom';
import Users from './containers/Users';
import Login from './containers/Login';
import Products from './containers/Products';
import WareHouse from './containers/WareHouse';
import NotFound from './components/NotFound';
import Register from './containers/Register';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<><Header /><SideNav /><div style={{ paddingLeft: 280, paddingRight: 50 }}><Outlet /></div><Footer /></>}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/warehouse" element={<WareHouse />} />
        </Route>

        <Route element={Cookies.get('token') ? <Navigate to='/' /> : <Outlet />}>
          <Route
            path='auth/login'
            element={<Login />}
          />
        </Route>
        <Route path="/auth/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;
