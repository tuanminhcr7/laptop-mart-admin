import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';

const Products = () => {

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
            images: null,
        })
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

                    <List />
                    <ModalCreate show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
                </Col>
            </Row>
        </div>

    );
};

export default Products;