import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalCreate = ({ show, handleClose, formData, setFormData }) => {

    const [masterData, setMasterData] = useState(null);
    const onChange = (name, value) => {
        const newFormData = _.clone(formData);
        newFormData[name] = value;
        setFormData(newFormData);
    }

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        })
    }

    useEffect(() => {
        show && getMasterData();
    }, [show]);

    const onFinish = () => {
        const payload = { ...formData };

        Api.productCreate(payload).then(res => {
            toast.success("Thêm mới thành công!");
            handleClose();
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        })
    }

    const props = {
        onChange(info) {
            const payload = new FormData();


            // console.log(info.fileList);

            info.fileList.forEach((image) => {
                payload.append('images', image.originFileObj)
            })

            // console.log(payload);
            Api.productUploadImages(payload).then(res => {
                setFormData({ ...formData, images: [res?.data?.data[0]] })
            }).catch(err => {
                toast.error("Upload không thành công!");
            });
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
                                required={true}
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
                                {masterData?.colors?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
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
                                {masterData?.resolutions?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
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
                                {masterData?.displays?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.size} Inches</Select.Option>
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <label>Card đồ họa</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('graphicsCardId', e)}
                            >
                                {masterData?.graphics_cards?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
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
                                {masterData?.manufacturers?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <label>Hệ điều hành</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('operatingSystemId', e)}
                            >
                                {masterData?.operating_systems?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
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
                                {masterData?.processors?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <label>Ram</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('ramId', e)}
                            >
                                {masterData?.rams?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.size} GB</Select.Option>
                                })}
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
                                {masterData?.refresh_rates?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.rate} Hz</Select.Option>
                                })}
                            </Select>
                        </Col>
                        <Col>
                            <label>Bộ nhớ</label><br />
                            <Select

                                style={{ width: '100%' }}
                                onChange={e => onChange('storageId', e)}
                            >
                                {masterData?.storages?.map(item => {
                                    return <Select.Option value={item?.id}>{item?.size} GB - {item?.type}</Select.Option>
                                })}
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