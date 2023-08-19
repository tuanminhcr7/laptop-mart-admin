import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/" className="brand-link">
                    <span className="brand-text font-weight-light">Laptop Mart</span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to={"/users"} href="pages/widgets.html" className="nav-link">
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        Quản lý người dùng
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/products"} href="pages/widgets.html" className="nav-link">
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        Quản lý sản phẩm
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/warehouse"} href="pages/widgets.html" className="nav-link">
                                    <i className="nav-icon fas fa-user" />
                                    <p>
                                        Quản lý nhập kho
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>

        </div>
    );
};

export default SideNav;