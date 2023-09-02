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
                            <label>Tên sản phẩm</label>
                            <Input

                                onChange={e => onChange('name', e.target.value)} />
                        </Col>
                        <Col>
                            <label>Mô tả</label>
                            <TextArea

                                onChange={e => {
                                    onChange('description', e.target.value);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Cân nặng</label>
                            <InputNumber

                                addonAfter="Kg"
                                onChange={e => onChange('weight', e)}
                            />
                        </Col>
                        <Col>
                            <label>Màu sắc</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('colorId', e)}
                            >
                                <Select.Option value={1}>Xanh</Select.Option>
                                <Select.Option value={2}>Trắng</Select.Option>
                                <Select.Option value={3}>Đen</Select.Option>
                            </Select>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <Select

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

                                addonAfter="VND"
                                onChange={e => onChange('price', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Màn hình</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('displayId', e)}
                            >
                                <Select.Option value={1}>13 inches</Select.Option>
                                <Select.Option value={2}>15.6 inches</Select.Option>
                                <Select.Option value={3}>15.7 inches</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <label>Card đồ họa</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('graphicsCardId', e)}
                            >
                                <Select.Option value={1}>Full HD</Select.Option>
                                <Select.Option value={2}>4K</Select.Option>
                                <Select.Option value={3}>8K</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Hãng sản xuất</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('manufacturerId', e)}
                            >
                                <Select.Option value={1}>Dell</Select.Option>
                                <Select.Option value={2}>Acer</Select.Option>
                                <Select.Option value={3}>Asus</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <label>Hệ điều hành</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('operatingSystemId', e)}
                            >
                                <Select.Option value={1}>MacOS</Select.Option>
                                <Select.Option value={2}>Window</Select.Option>
                                <Select.Option value={3}>Linux</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Bộ vi xử lý</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('processorId', e)}
                            >
                                <Select.Option value={1}>Intel Core i3</Select.Option>
                                <Select.Option value={2}>Intel Core i5</Select.Option>
                                <Select.Option value={3}>Intel Core i7</Select.Option>
                                <Select.Option value={4}>Intel Core i9</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <label>Ram</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('ramId', e)}
                            >
                                <Select.Option value={1}>4GB</Select.Option>
                                <Select.Option value={2}>8GB</Select.Option>
                                <Select.Option value={3}>16GB</Select.Option>
                                <Select.Option value={4}>32GB</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Tần số quét</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('refreshRateId', e)}
                            >
                                <Select.Option value={1}>60 Hz</Select.Option>
                                <Select.Option value={2}>75 Hz</Select.Option>
                                <Select.Option value={3}>120 Hz</Select.Option>
                            </Select>
                        </Col>
                        <Col>
                            <label>Bộ nhớ</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('storageId', e)}
                            >
                                <Select.Option value={1}>500 GB</Select.Option>
                                <Select.Option value={2}>1 TB</Select.Option>
                                <Select.Option value={3}>2 TB</Select.Option>
                                <Select.Option value={4}>2.5 TB</Select.Option>
                            </Select>
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
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreate;