import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';
import { useParams } from 'react-router-dom';
import Api from '../../Apis';
import { Spin } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Variant = () => {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const url = useParams();
    const productId = url?.id
    const [dataProductVariant, setDataProductVariant] = useState([]);
    const [productName, setProductName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        weight: null || 0,
        description: null,
        colorId: null,
        displayId: null,
        graphicsCardId: null,
        manufacturerId: null,
        operatingSystemId: null,
        processorId: null,
        ramId: null,
        price: null || 0,
        refreshRateId: null,
        resolutionId: null,
        storageId: null,
        images: [],
    });

    const getDataProductVariant = async () => {
        setLoading(true);
        Api.productShow(productId).then(res => {
            setDataProductVariant(res?.data?.data?.variants);
            setProductName(res?.data?.data?.name);
            setLoading(false);
        }).catch(err => {

        });
    }

    useEffect(() => {
        getDataProductVariant();
    }, []);

    const onRefresh = () => {
        getDataProductVariant();
    }

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
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col><h3>Biến thể sản phẩm</h3></Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>

                    <Spin spinning={loading}>
                        <List productName={productName} onRefresh={onRefresh} productId={productId} data={dataProductVariant} />
                    </Spin>
                    <ModalCreate productName={productName} productId={productId} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
};

export default Variant;