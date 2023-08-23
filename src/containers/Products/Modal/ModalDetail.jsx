import { Input } from 'antd';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    console.log(dataChoose);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>First Name</label>
                            <Input value={dataChoose?.firstName} />
                        </Col>
                        <Col>
                            <label>Last Name</label>
                            <Input value={dataChoose?.lastName} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Email</label>
                            <Input value={dataChoose?.email} />
                        </Col>
                        <Col>
                            <label>Phone</label>
                            <Input value={dataChoose?.phone} />
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