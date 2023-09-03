import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DatePicker, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import moment from 'moment';

const ModalCreate = ({ show, handleClose, formData, setFormData, productId, productName }) => {

    const onChange = (name, value) => {
        const newFormData = _.clone(formData);
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const onFinish = () => {
        const payload = { ...formData };
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
                    <Row>
                        <Col>
                            <label>Số lượng</label>
                            <Input

                                onChange={e => onChange('quantity', e.target.value)} />
                        </Col>
                        <Col>
                            <label>Ngày nhập kho</label>
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={e => onChange('entryDatetime', e && moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Giá nhập kho</label>
                            <InputNumber

                                addonAfter="$"
                                onChange={e => onChange('entryPrice', e)}
                            />
                        </Col>
                        <Col></Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onFinish}>
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreate;