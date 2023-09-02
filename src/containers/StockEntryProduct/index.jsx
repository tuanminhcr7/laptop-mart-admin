import { Col, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';
import { useParams } from 'react-router-dom';
import ModalCreate from './Modal/ModalCreate';

const StockEntryProduct = () => {

    const param = useParams();
    console.log(param);
    const productId = param?.id;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });
    const [formData, setFormData] = useState({
        quantity: null,
        entryDatetime: null,
        entryPrice: null
    })
    const [loading, setLoading] = useState(false);
    const [listStockEntryProduct, setListStockEntryProduct] = useState([
        {
            "id": 6,
            "product_id": 6,
            "quantity": 22,
            "entry_datetime": "2023-08-15T12:30:22.000Z",
            "entry_price": 800,
            "created_at": "2023-08-15T08:09:49.000Z"
        },
        {
            "id": 1,
            "product_id": 6,
            "quantity": 10,
            "entry_datetime": "2023-08-15T12:22:22.000Z",
            "entry_price": 800,
            "created_at": "2023-08-15T06:22:02.000Z"
        }
    ]);

    const handleShowModalCreate = () => {
        setShowModalCreate(true);
    }
    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        setFormData({
            ...formData,
            quantity: null,
            entryDatetime: null,
            entryPrice: null
        });
        onRefresh();
    };

    const getListStockEntryProduct = useCallback(async () => {
        Api.stockEntriesListProduct(productId, params).then(res => {
            // setListStockEntryProduct(res?.data?.data);
        }).catch(err => {

        });
    });

    useEffect(() => {
        getListStockEntryProduct();
    }, []);

    const onRefresh = () => {
        getListStockEntryProduct();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col>
                            <h3>Quản lý kho của sản phẩm</h3>
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>
                    <Spin spinning={loading}>
                        <List productId={productId} data={listStockEntryProduct} />
                    </Spin>
                </Col>
                <ModalCreate productId={productId} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
            </Row>

        </div>
    );
};

export default StockEntryProduct;