import { Col, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';
import { useParams } from 'react-router-dom';
import ModalCreate from './Modal/ModalCreate';

const StockEntryProduct = () => {

    const param = useParams();
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
    const [listStockEntryProduct, setListStockEntryProduct] = useState([]);
    const [dataProductShow, setDataProductShow] = useState(null);

    const getProductShow = async () => {
        Api.productShow(productId).then(res => {
            setDataProductShow(res?.data?.data)
        }).catch(err => {

        });
    }

    const handleShowModalCreate = () => {
        setShowModalCreate(true);
    }
    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        setFormData({
            quantity: null,
            entryDatetime: null,
            entryPrice: null
        });
        onRefresh();
    };

    const getListStockEntryProduct = useCallback(async () => {
        setLoading(true);
        Api.stockEntriesListProduct(productId, params).then(res => {
            setListStockEntryProduct(res?.data?.data);
            setLoading(false);
        }).catch(err => {

        });
    });

    useEffect(() => {
        getListStockEntryProduct();
        getProductShow();
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

                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>

                    <Spin spinning={loading}>
                        <List onRefresh={onRefresh} productName={dataProductShow?.name} productId={productId} data={listStockEntryProduct} />
                    </Spin>
                </Col>
                <ModalCreate productName={dataProductShow?.name} productId={productId} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
            </Row>

        </div>
    );
};

export default StockEntryProduct;