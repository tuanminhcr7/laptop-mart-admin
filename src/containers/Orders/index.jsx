import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import { Col, Row, Spin } from 'antd';
import Api from '../../Apis';
import { toast } from 'react-toastify';

const Orders = () => {

    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });
    const [listOrder, setListOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListOrder = useCallback(async () => {
        setLoading(true);
        Api.orderList(params).then(res => {
            setListOrder(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }, []);

    useEffect(() => {
        getListOrder();
    }, []);

    const onRefresh = () => {
        getListOrder();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý đơn hàng</h3>
                    <Spin spinning={loading}>
                        <List onRefresh={onRefresh} data={listOrder} />
                    </Spin>
                </Col>
            </Row>
        </div>
    );
};

export default Orders;