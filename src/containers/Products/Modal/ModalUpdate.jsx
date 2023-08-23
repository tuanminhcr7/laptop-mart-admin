import { Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';

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

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
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
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Tên sản phẩm</label>
                            <Input defaultValue={dataChoose?.name} onChange={e => onChange('name', e.target.value)} />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Mô tả</label>
                            <TextArea
                                defaultValue={dataChoose?.description}
                                onChange={e => {
                                    onChange('description', e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Cân nặng</label>
                            <InputNumber
                                defaultValue={dataChoose?.weight}
                                addonAfter="Kg"
                                onChange={e => onChange('weight', e)}
                            />
                        </Col>
                        <Col>
                            <label>Màu sắc</label><br />
                            <Select
                                defaultValue={dataChoose?.colorId}
                                style={{ width: '100%' }}
                                onChange={e => onChange('colorId', e)}
                            >
                                <Select.Option value={1}>Xanh</Select.Option>
                                <Select.Option value={2}>Trắng</Select.Option>
                                <Select.Option value={3}>Đen</Select.Option>
                            </Select>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <Select
                                defaultValue={dataChoose?.resolutionId}
                                style={{ width: '100%' }}
                                onChange={e => onChange('resolutionId', e)}
                            >
                                <Select.Option value={1}>Full HD</Select.Option>
                                <Select.Option value={2}>4K</Select.Option>
                                <Select.Option value={3}>8K</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <label>Giá</label>
                            <InputNumber
                                defaultValue={dataChoose?.price}
                                addonAfter="VND"
                                onChange={e => onChange('price', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <label className=''>Hình ảnh</label>
                            <Upload {...props}>
                                <BtnUpload className='mb-2' size='small' style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }} icon={<UploadOutlined />}>Click to Upload</BtnUpload>
                            </Upload>
                        </Col>
                    </Row>
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