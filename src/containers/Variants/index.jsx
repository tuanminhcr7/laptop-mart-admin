import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';
import { useParams } from 'react-router-dom';
import Api from '../../Apis';

const Variant = () => {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const url = useParams();
    const productId = url?.id
    const [dataProductVariant, setDataProductVariant] = useState([]);
    const [formData, setFormData] = useState({
        name: null,
        weight: null,
        description: null,
        price: null,
        colorId: null,
        images: [],
    });

    const getDataProductVariant = async () => {
        Api.productShow(productId).then(res => {
            setDataProductVariant(res?.data?.data?.variants);
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
            images: null,
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

                    <List onRefresh={onRefresh} productId={productId} data={dataProductVariant} />
                    <ModalCreate productId={productId} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
                </Col>
            </Row>
        </div>
    );
};

export default Variant;