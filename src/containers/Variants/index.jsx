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

    const getDataProductShow = async () => {
        Api.productShow(productId).then(res => {
            setProductName(res?.data?.data?.name);
        }).catch(err => {

        });
    }

    const getDataProductVariant = async () => {
        setLoading(true);
        Api.productVariantList(productId).then(res => {
            setDataProductVariant(res?.data?.data);
            setLoading(false);
        }).catch(err => {

        });
    }

    useEffect(() => {
        getDataProductVariant();
        getDataProductShow();
    }, []);

    const onRefresh = () => {
        getDataProductVariant();
    }

    const handleShowModalCreate = () => {
        setShowModalCreate(true);
    }
    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
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
                        <List
                            productName={productName}
                            onRefresh={onRefresh}
                            productId={productId}
                            data={dataProductVariant}
                        />
                    </Spin>

                    <ModalCreate
                        productName={productName}
                        productId={productId}
                        show={showModalCreate}
                        handleClose={handleCloseModalCreate}
                    />
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
};

export default Variant;