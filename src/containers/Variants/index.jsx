import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';
import { useParams } from 'react-router-dom';

const Variant = () => {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const url = useParams();
    const [formData, setFormData] = useState({
        name: null,
        weight: null,
        description: null,
        colorId: null,
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
            images: null,
        })
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

                    <List ids={url?.id} />
                    <ModalCreate ids={url?.id} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
                </Col>
            </Row>
        </div>
    );
};

export default Variant;