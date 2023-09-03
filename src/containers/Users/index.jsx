import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {

    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });
    const [loading, setLoading] = useState(false);
    const [listUser, setListUser] = useState([]);

    const getListUser = useCallback(async () => {
        setLoading(true);
        Api.userList(params).then(res => {
            setListUser(res?.data?.data)
            setLoading(false);
        }).then(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }, []);

    useEffect(() => {
        getListUser();
    }, []);

    const onRefresh = () => {
        getListUser();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý người dùng</h3>
                    <Spin spinning={loading}>
                        <List onRefresh={onRefresh} data={listUser} />
                    </Spin>
                </Col>
            </Row>
            <ToastContainer />
        </div>

    );
};

export default Users;