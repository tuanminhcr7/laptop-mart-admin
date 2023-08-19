import { Button } from 'antd';
import React from 'react';

const Header = () => {
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Button style={{
                            marginTop: 5,
                            border: 'none',
                            background: '#007bff',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#fff'
                        }}>Sign Out</Button>
                    </li>
                </ul>

            </nav>

        </div>
    );
};

export default Header;