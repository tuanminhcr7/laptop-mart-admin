import { Button } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        toast.success('Đăng xuất thành công!');
        setTimeout(() => {
            navigate('/auth/login');
        }, 2000);

    }

    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Button
                            style={{
                                marginTop: 5,
                                border: 'none',
                                background: '#007bff',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#fff'
                            }}
                            onClick={handleLogout}
                        >Logout</Button>
                    </li>
                </ul>

            </nav>

        </div>
    );
};

export default Header;