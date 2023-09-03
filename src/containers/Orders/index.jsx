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
    const [listOrder, setListOrder] = useState([
        {
            "id": 2,
            "user_id": 2,
            "status": 0,
            "recipient_name": "Nguyen Van A",
            "recipient_phone": "0123456789",
            "total_amount": 2100,
            "shipping_address": "219 Trung Kinh, Yen Hoa, Cau Giay, Ha Noi",
            "note": "Giao hang nhanh",
            "created_at": "2023-08-29T08:45:08.000Z",
            "order_items": [
                {
                    "id": 2,
                    "order_id": 2,
                    "product_id": 28,
                    "quantity": 1,
                    "price": 1000
                },
                {
                    "id": 1,
                    "order_id": 2,
                    "product_id": 6,
                    "quantity": 1,
                    "price": 1100
                }
            ],
            "order_payment": null
        }
    ]);
    const [loading, setLoading] = useState(false);

    const getListOrder = useCallback(async () => {
        setLoading(true);
        Api.orderList(params).then(res => {
            // setListOrder(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error("Có lỗi xảy ra");
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