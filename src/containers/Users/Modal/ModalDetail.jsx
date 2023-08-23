import { Input } from 'antd';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalDetail = ({ show, handleClose, handleShow, dataChoose }) => {

    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        status: null,
    });

    const onChange = (name, value) => {
        const newFormData = _.clone(formData);
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const onFinish = () => {
        console.log(formData);
    }
    return (
        <div>

            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>First Name</label>
                            <Input disabled value={dataChoose?.firstName} />
                        </Col>
                        <Col>
                            <label>Last Name</label>
                            <Input disabled value={dataChoose?.lastName} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Email</label>
                            <Input disabled value={dataChoose?.email} />
                        </Col>
                        <Col>
                            <label>Phone</label>
                            <Input disabled value={dataChoose?.phone} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDetail;