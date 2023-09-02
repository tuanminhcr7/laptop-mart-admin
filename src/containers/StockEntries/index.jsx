import { Col, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';

const StockEntries = () => {

    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });
    const [loading, setLoading] = useState(false);
    const [listStockEntries, setListStockEntries] = useState([
        {
            "id": 6,
            "product_id": 6,
            "quantity": 22,
            "entry_datetime": "2023-08-15T12:30:22.000Z",
            "entry_price": 800,
            "created_at": "2023-08-15T08:09:49.000Z",
            "product": {
                "id": 6,
                "name": "Test API update",
                "price": 1100,
                "inventory": 32,
                "parent": null
            }
        },
        {
            "id": 4,
            "product_id": 28,
            "quantity": 8,
            "entry_datetime": "2023-08-15T12:30:22.000Z",
            "entry_price": 800,
            "created_at": "2023-08-15T07:54:27.000Z",
            "product": {
                "id": 28,
                "name": "Test API - variant 2",
                "price": 1000,
                "inventory": 8,
                "parent": {
                    "id": 6,
                    "name": "Test API update",
                    "price": 1100,
                    "inventory": 32
                }
            }
        },
        {
            "id": 1,
            "product_id": 6,
            "quantity": 10,
            "entry_datetime": "2023-08-15T12:22:22.000Z",
            "entry_price": 800,
            "created_at": "2023-08-15T06:22:02.000Z",
            "product": {
                "id": 6,
                "name": "Test API update",
                "price": 1100,
                "inventory": 32,
                "parent": null
            }
        }
    ]);

    const getListStockEntries = useCallback(async () => {
        Api.stockEntriesList(params).then(res => {
            // setListStockEntries(res?.data?.data);
        }).catch(err => {

        });
    }, []);

    useEffect(() => {
        getListStockEntries();
    }, []);

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý kho</h3>
                    <Spin spinning={loading}>
                        <List data={listStockEntries} />
                    </Spin>
                </Col>
            </Row>
        </div>
    );
};

export default StockEntries;