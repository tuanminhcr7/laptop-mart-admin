import React from 'react';
import List from './List';
import { Col, Row } from 'antd';

const Orders = () => {
    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý đơn hàng</h3>
                    <List />
                </Col>
            </Row>
        </div>
    );
};

export default Orders;