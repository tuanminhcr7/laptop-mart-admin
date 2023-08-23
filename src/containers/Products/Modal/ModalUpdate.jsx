import { Input } from 'antd';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [formData, setFormData] = useState(null);

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataChoose);
        newDataChoose[name] = value;
        setFormData(newDataChoose);
    }

    const onFinish = () => {
        console.log(formData);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>First Name</label>
                            <Input defaultValue={dataChoose?.firstName} onChange={e => onChange('name', e.target.value)} />
                        </Col>
                        <Col>
                            <label>Last Name</label>
                            <Input defaultValue={dataChoose?.lastName} onChange={e => onChange('description', e.target.value)} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Email</label>
                            <Input defaultValue={dataChoose?.email} onChange={e => onChange('email', e.target.value)} />
                        </Col>
                        <Col>
                            <label>Phone</label>
                            <Input defaultValue={dataChoose?.phone} onChange={e => onChange('phone', e.target.value)} />
                        </Col>
                    </Row>
                    {/* <Row className='mt-3'>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <label>Trạng thái</label><br />
                            <Switch className='mx-3 mb-2'
                                size='small'
                                defaultChecked={dataChoose?.status == 1 ? true : false}
                                onChange={e => onChange('status', e ? 1 : 0)}
                            />
                        </Col>
                    </Row> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onFinish}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default ModalUpdate;