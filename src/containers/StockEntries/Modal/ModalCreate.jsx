import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalCreate = ({ show, handleClose, formData, setFormData }) => {

    const onChange = (name, value) => {
        const newFormData = _.clone(formData);
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const getMasterData = async () => {
        Api.masterData().then(res => {
            console.log(res?.data?.data);
        }).catch(err => {
            toast("Có lỗi xảy ra!");
        })
    }

    useEffect(() => {
        getMasterData();
    }, []);

    const onFinish = () => {
        console.log(formData);
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            console.log(info);
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới sản phẩm</Modal.Title>
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