import { Col, Row, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import List from './List';
import Api from '../../Apis';
import { useParams } from 'react-router-dom';
import ModalCreate from './Modal/ModalCreate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockEntryProductVariant = () => {

    const param = useParams();
    console.log(param);
    const productId = param?.idProduct;
    const productVariantId = param?.idProductVariant;
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
    const [listStockEntryProductVariant, setListStockEntryProductVariant] = useState([]);
    const [dataProductVariantShow, setDataProductVariantShow] = useState(null);

    const getProductVariantShow = async () => {
        Api.productVariantShow(productId, productVariantId).then(res => {
            setDataProductVariantShow(res?.data?.data)
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
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

    const getListStockEntryProductVariant = useCallback(async () => {
        setLoading(true);
        Api.stockEntriesListProduct(productVariantId, params).then(res => {
            setListStockEntryProductVariant(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    });

    useEffect(() => {
        getListStockEntryProductVariant();
        getProductVariantShow();
    }, []);

    const onRefresh = () => {
        getListStockEntryProductVariant();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col>
                            <h3>Quản lý kho của biến thể sản phẩm: {dataProductVariantShow?.name}</h3>
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>

                    <Spin spinning={loading}>
                        <List
                            onRefresh={onRefresh}
                            productName={dataProductVariantShow?.name}
                            productId={productVariantId}
                            data={listStockEntryProductVariant}
                        />
                    </Spin>
                </Col>

                <ModalCreate
                    productName={dataProductVariantShow?.name}
                    productId={productVariantId}
                    show={showModalCreate}
                    handleClose={handleCloseModalCreate}
                    formData={formData}
                    setFormData={setFormData}
                />
            </Row>
            <ToastContainer />
        </div>
    );
};

export default StockEntryProductVariant;