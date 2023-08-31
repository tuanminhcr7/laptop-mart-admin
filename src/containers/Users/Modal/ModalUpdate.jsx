import { Form, Input, Switch } from 'antd';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalUpdate = ({ show, handleClose, handleShow, dataChoose, onRefresh }) => {


    const [formData, setFormData] = useState(null);

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataChoose);
        newDataChoose[name] = value;
        setFormData(newDataChoose);
    }

    const onFinish = () => {
        console.log(formData);
        const payload = {
            firstName: formData?.first_name,
            lastName: formData?.last_name,
            email: formData?.email,
            phone: formData?.phone,
            status: formData?.status
        }
        Api.userUpdate(formData?.id, payload).then(res => {
            onRefresh();
            handleClose();
            toast.success("Cập nhật thành công!");
        }).catch(err => {
            toast.error("Cập nhật thất bại");
        });
    }
    return (
        <div>

            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <label>First Name</label>
                                <Input defaultValue={dataChoose?.first_name} onChange={e => onChange('first_name', e.target.value)} />
                            </Col>
                            <Col>
                                <label>Last Name</label>
                                <Input defaultValue={dataChoose?.last_name} onChange={e => onChange('last_name', e.target.value)} />
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
                        <Row className='mt-3'>
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                <label>Trạng thái</label><br />
                                <Switch className='mx-3 mb-2'
                                    size='small'
                                    defaultChecked={dataChoose?.status == 1 ? true : false}
                                    onChange={e => onChange('status', e ? 1 : 0)}
                                />
                            </Col>
                        </Row>
                    </Form>

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
        </div>
    );
};

export default ModalUpdate;