import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalDetail = ({ show, handleClose, handleShow, dataChoose }) => {

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
                            {/* <Input disabled value={dataChoose?.first_name} /> */}
                            <p>{dataChoose?.first_name}</p>
                        </Col>
                        <Col>
                            <label>Last Name</label>
                            <p>{dataChoose?.last_name}</p>
                            {/* <Input disabled value={dataChoose?.last_name} /> */}
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Email</label>
                            <p>{dataChoose?.email}</p>
                            {/* <Input disabled value={dataChoose?.email} /> */}
                        </Col>
                        <Col>
                            <label>Phone</label>
                            <p>{dataChoose?.phone}</p>
                            {/* <Input disabled value={dataChoose?.phone} /> */}
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