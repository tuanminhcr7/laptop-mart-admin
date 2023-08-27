import { Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Tên sản phẩm</label>
                            <Input disabled defaultValue={dataChoose?.name} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Mô tả</label>
                            <TextArea
                                disabled
                                value={dataChoose?.description}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Cân nặng</label>
                            <InputNumber
                                disabled
                                defaultValue={dataChoose?.weight}
                                addonAfter="Kg"
                            />
                        </Col>
                        <Col>
                            <label>Màu sắc</label><br />
                            <Input disabled value={dataChoose?.color} />
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <Input disabled value={dataChoose?.resolution} />
                        </Col>
                        <Col>
                            <label>Giá</label>
                            <InputNumber
                                disabled
                                value={dataChoose?.price}
                                addonAfter="VND"
                            />
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