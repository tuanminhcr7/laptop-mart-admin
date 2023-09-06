import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';
import Api from '../../Apis';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {

    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });

    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        weight: null,
        description: null,
        colorId: null,
        displayId: null,
        graphicsCardId: null,
        manufacturerId: null,
        operatingSystemId: null,
        processorId: null,
        ramId: null,
        refreshRateId: null,
        resolutionId: null,
        storageId: null,
        images: null,
    });

    const handleShowModalCreate = () => {
        setShowModalCreate(true);
    }
    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        setFormData({
            ...formData,
            name: null,
            weight: null,
            description: null,
            colorId: null,
            displayId: null,
            graphicsCardId: null,
            manufacturerId: null,
            operatingSystemId: null,
            processorId: null,
            ramId: null,
            price: null,
            refreshRateId: null,
            resolutionId: null,
            storageId: null,
            images: [],
        });
        onRefresh();
    };

    const getListProduct = useCallback(async () => {
        setLoading(true);
        Api.productList(params).then(res => {
            setListProduct(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }, []);

    useEffect(() => {
        getListProduct();
    }, []);

    const onRefresh = () => {
        getListProduct();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col><h3>Quản lý sản phẩm</h3></Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>
                    <Spin spinning={loading}>
                        <List
                            onRefresh={onRefresh}
                            data={listProduct}
                        />
                    </Spin>
                    <ModalCreate
                        show={showModalCreate}
                        handleClose={handleCloseModalCreate}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </Col>
            </Row>
            <ToastContainer />
        </div>

    );
};

export default Products;