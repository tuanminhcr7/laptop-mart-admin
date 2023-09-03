import { Col, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockEntries = () => {

    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });
    const [loading, setLoading] = useState(false);
    const [listStockEntries, setListStockEntries] = useState();

    const getListStockEntries = useCallback(async () => {
        setLoading(true);
        Api.stockEntriesList(params).then(res => {
            setListStockEntries(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }, []);

    useEffect(() => {
        getListStockEntries();
    }, []);

    const onRefresh = () => {
        getListStockEntries();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý kho</h3>
                    <Spin spinning={loading}>
                        <List onRefresh={onRefresh} data={listStockEntries} />
                    </Spin>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
};

export default StockEntries;