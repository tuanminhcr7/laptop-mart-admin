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
import NotFound from './components/NotFound';
import Variants from './containers/Variants';
import Orders from './containers/Orders';
import StockEntries from './containers/StockEntries';
import StockEntryProduct from './containers/StockEntryProduct';
import StockEntryProductVariant from './containers/StockEntryProductVariant';
import Shipping from './containers/Shipping';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          element={
            !Cookies.get('token') ? <Navigate to='/auth/login' /> : <Outlet />
          }
        >
          <Route element={<><Header /><SideNav /><div style={{ paddingLeft: 280, paddingRight: 50 }}><Outlet /></div><Footer /></>}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id/variants" element={<Variants />} />
            <Route path="/products/stock-entries" element={<StockEntries />} />
            <Route path="/products/:id/stock-entries" element={<StockEntryProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/:idProduct/stock-entries/variants/:idProductVariant" element={<StockEntryProductVariant />} />
            <Route path="/products/shipping/:orderId" element={<Shipping />} />
          </Route>
        </Route>

        <Route element={Cookies.get('token') ? <Navigate to='/' /> : <Outlet />}>
          <Route
            index
            path='auth/login'
            element={<Login />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;
