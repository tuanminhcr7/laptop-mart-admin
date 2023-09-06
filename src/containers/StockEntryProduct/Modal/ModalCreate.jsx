import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Button as BtnUpdate } from 'antd'

const ModalCreate = ({ show, handleClose, formData, setFormData, productId, productName }) => {

    const onChange = (name, value) => {
        const newFormData = _.clone(formData);
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const onFinish = (value) => {
        const payload = {
            quantity: value?.quantity,
            entryDatetime: moment(value?.entryDatetime)?._i,
            entryPrice: value?.entryPrice
        };
        Api.stockEntriesCreate(productId, payload).then(res => {
            toast.success("Thêm mới thành công!");
            handleClose();
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới sản phẩm kho: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onFinish={onFinish}
                        initialValues={{
                            quantity: null,
                            entryDatetime: null,
                            entryPrice: null,
                        }}
                    >
                        <Row>
                            <Col>
                                <label>Số lượng</label>
                                <Form.Item
                                    name={"quantity"}
                                >
                                    <Input

                                    />
                                </Form.Item>

                            </Col>
                            <Col>
                                <label>Ngày nhập kho</label>
                                <Form.Item
                                    name={"entryDatetime"}
                                >
                                    <input type='datetime-local' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Giá nhập kho</label>
                                <Form.Item
                                    name={"entryPrice"}
                                >
                                    <InputNumber
                                        addonAfter="$"
                                    />
                                </Form.Item>

                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Hủy
                                </Button>
                                <BtnUpdate className='mx-1 bg-primary' htmlType='submit'>Cập nhật</BtnUpdate>
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onFinish}>
                        Thêm mới
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreate;