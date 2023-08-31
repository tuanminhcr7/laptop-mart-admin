import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../Apis';
import { toast } from 'react-toastify';

const SideNav = () => {

    const [dataProfile, setDataProfile] = useState();

    const getProfile = useCallback(async () => {
        Api.profile().then(res => {
            setDataProfile({ ...dataProfile, firstName: res?.data?.data?.firstName, lastName: res?.data?.data?.lastName })
        }).catch(err => {
            toast.error('Có lỗi xảy ra!');
        });
    }, []);

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link style={{ textAlign: 'center' }} to="/" className="brand-link">
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
                            <Link to={'/profile'} className="d-block">{dataProfile?.firstName} {dataProfile?.lastName}</Link>
                        </div>
                    </div>

                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to={"/users"} href="pages/widgets.html" className="nav-link">
                                    {/* <i className="nav-icon fas fa-user" /> */}
                                    <p>
                                        Quản lý người dùng
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/products"} href="pages/widgets.html" className="nav-link">
                                    {/* <i className="nav-icon fas fa-user" /> */}
                                    <p>
                                        Quản lý sản phẩm
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/orders"} href="pages/widgets.html" className="nav-link">
                                    {/* <i className="nav-icon fas fa-user" /> */}
                                    <p>
                                        Quản lý đơn hàng
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