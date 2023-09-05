import { Image, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [showModalVariant, setShowModalVarial] = useState(false);
    const [itemVariantSelected, setItemVariantSelected] = useState(null);
    const [masterData, setMasterData] = useState(null);
    const [dataProductShow, setDataProductShow] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: dataProductShow?.name,
        price: dataProductShow?.price,
        weight: dataProductShow?.weight,
        description: dataProductShow?.description,
        colorId: dataProductShow?.color?.id,
        displayId: dataProductShow?.display?.id,
        graphicsCardId: dataProductShow?.graphics_card?.id,
        manufacturerId: dataProductShow?.manufacturer?.id,
        operatingSystemId: dataProductShow?.operating_system?.id,
        processorId: dataProductShow?.processor?.id,
        ramId: dataProductShow?.ram?.id,
        refreshRateId: dataProductShow?.refresh_rate?.id,
        resolutionId: dataProductShow?.resolution?.id,
        storageId: dataProductShow?.storage?.id,
        images: [dataProductShow?.images[0]?.url]
    });

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }
    const getProductShow = async () => {
        setLoading(true);
        Api.productShow(dataChoose?.id).then(res => {
            setDataProductShow(res?.data?.data);
            setLoading(false);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });

    };

    useEffect(() => {
        show && getMasterData();
        show && getProductShow();
        show !== true && setDataProductShow(null);
    }, [show])

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataProductShow);
        newDataChoose[name] = value;

        setFormData({
            name: newDataChoose?.name,
            price: newDataChoose?.price,
            weight: newDataChoose?.weight,
            description: newDataChoose?.description,
            colorId: newDataChoose?.colorId || newDataChoose?.color?.id,
            displayId: newDataChoose?.display?.id,
            graphicsCardId: newDataChoose?.graphicsCardId || newDataChoose?.graphics_card?.id,
            manufacturerId: newDataChoose?.manufacturerId || newDataChoose?.manufacturer?.id,
            operatingSystemId: newDataChoose?.operatingSystemId || newDataChoose?.operating_system?.id,
            processorId: newDataChoose?.processorId || newDataChoose?.processor?.id,
            ramId: newDataChoose?.ramId || newDataChoose?.ram?.id,
            refreshRateId: newDataChoose?.refreshRateId || newDataChoose?.refresh_rate?.id,
            resolutionId: newDataChoose?.resolutionId || newDataChoose?.resolution?.id,
            storageId: newDataChoose?.storageId || newDataChoose?.storage?.id,
            images: [newDataChoose?.images[0]?.url]
        });
    }

    const onFinish = () => {
        const payload = { ...formData };
        Api.productEdit(dataProductShow?.id, payload).then(res => {
            handleClose();
            toast.success("Cập nhật thành công");
        }).catch(err => {

        });
    }

    const props = {
        onChange(info) {
            const payload = new FormData();

            info.fileList.forEach((image) => {
                payload.append('images', image.originFileObj)
            })

            Api.productUploadImages(payload).then(res => {
                setFormData({ ...formData, images: [res?.data?.data[0]] })
            }).catch(err => {

            });
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataProductShow &&
                        <>
                            <Spin spinning={loading}>
                                <Row>
                                    <Col>
                                        <label>Tên sản phẩm</label>
                                        <Input defaultValue={dataProductShow?.name} onChange={e => onChange('name', e.target.value)} />
                                    </Col>
                                    <Col>
                                        <label>Mô tả</label>
                                        <TextArea
                                            defaultValue={dataProductShow?.description}
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
                                            defaultValue={dataProductShow?.weight}
                                            addonAfter="Kg"
                                            onChange={e => onChange('weight', e)}
                                        />
                                    </Col>
                                    <Col>
                                        <label>Màu sắc</label><br />
                                        <Select
                                            defaultValue={dataProductShow?.color?.id}
                                            style={{ width: '100%' }}
                                            onChange={e => onChange('colorId', e)}
                                        >
                                            {masterData?.colors?.map(item => {
                                                return <Select.Option value={item?.id}>{item?.name}</Select.Option>

                                            })}
                                        </Select>
                                    </Col>

                                </Row>
                                <Row className='mt-3'>
                                    <Col>
                                        <label>Độ phân giải</label><br />
                                        <Select
                                            defaultValue={dataProductShow?.resolution?.id}
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
                                            defaultValue={dataProductShow?.price}
                                            addonAfter="VND"
                                            onChange={e => onChange('price', e)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Màn hình</label><br />
                                        <Select
                                            defaultValue={dataProductShow?.display?.id}
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
                                            defaultValue={dataProductShow?.graphics_card?.id}
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
                                            defaultValue={dataProductShow?.manufacturer?.id}
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
                                            defaultValue={dataProductShow?.operating_system?.id}
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
                                            defaultValue={dataProductShow?.processor?.id}
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
                                            defaultValue={dataProductShow?.ram?.id}
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
                                            defaultValue={dataProductShow?.refresh_rate?.id}
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
                                            defaultValue={dataProductShow?.storage?.id}
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
                                        <Image
                                            width={100}
                                            preview={false}
                                            src={dataProductShow?.images[0]?.url}
                                        />
                                        <Upload {...props}>
                                            <BtnUpload className='mb-2' size='small' style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }} icon={<UploadOutlined />}>Click to Upload</BtnUpload>
                                        </Upload>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col className='mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                                        {/* <Button variant='success' onClick={e => handleShowModalVariant(dataProductShow)}>Biến thể</Button> */}
                                        <Button variant='success'>
                                            <Link style={{ color: '#fff' }} to={`/products/${dataProductShow?.id}/variants`}>Biến thể</Link>
                                        </Button>
                                    </Col>
                                </Row>
                            </Spin>
                        </>
                    }


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