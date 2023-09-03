import { Image, Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalUpdate = ({ show, handleClose, productId, dataChoose, onRefresh, productName }) => {

    const [showModalVariant, setShowModalVarial] = useState(false);
    const [itemVariantSelected, setItemVariantSelected] = useState(null);
    const [eventOnChange, setEvenOnChange] = useState(false);
    const [masterData, setMasterData] = useState(null);
    const [formData, setFormData] = useState({
        name: dataChoose && dataChoose?.name,
        price: dataChoose && dataChoose?.price,
        weight: dataChoose && dataChoose?.weight,
        description: dataChoose && dataChoose?.description,
        colorId: dataChoose && dataChoose?.color?.id,
        displayId: dataChoose && dataChoose?.displays?.id,
        graphicsCardId: dataChoose && dataChoose?.graphics_card?.id,
        manufacturerId: dataChoose && dataChoose?.manufacturer?.id,
        operatingSystemId: dataChoose && dataChoose?.operating_system?.id,
        processorId: dataChoose && dataChoose?.processor?.id,
        ramId: dataChoose && dataChoose?.ram?.id,
        refreshRateId: dataChoose && dataChoose?.refresh_rate?.id,
        resolutionId: dataChoose && dataChoose?.resolution?.id,
        storageId: dataChoose && dataChoose?.storage?.id,
        images: dataChoose && dataChoose?.images && dataChoose?.images[0]?.url
    });
    console.log(dataChoose);

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {

        });
    }

    useEffect(() => {
        show && getMasterData();
    }, [show]);
    console.log(dataChoose);

    const onChange = (name, value) => {
        setEvenOnChange(true);
        const newDataChoose = _.clone(dataChoose);
        newDataChoose[name] = value;
        setFormData({
            name: newDataChoose && newDataChoose?.name,
            price: newDataChoose && newDataChoose?.price,
            weight: newDataChoose && newDataChoose?.weight,
            description: newDataChoose && newDataChoose?.description,
            colorId: newDataChoose && newDataChoose?.color?.id,
            displayId: newDataChoose && newDataChoose?.displays?.id,
            graphicsCardId: newDataChoose && newDataChoose?.graphics_card?.id,
            manufacturerId: newDataChoose && newDataChoose?.manufacturer?.id,
            operatingSystemId: newDataChoose && newDataChoose?.operating_system?.id,
            processorId: newDataChoose && newDataChoose?.processor?.id,
            ramId: newDataChoose && newDataChoose?.ram?.id,
            refreshRateId: newDataChoose && newDataChoose?.refresh_rate?.id,
            resolutionId: newDataChoose && newDataChoose?.resolution?.id,
            storageId: newDataChoose && newDataChoose?.storage?.id,
            images: newDataChoose?.images[0]?.url
        });
    }

    const onFinish = () => {
        const payload = { ...formData }
        Api.productVariantsUpdate(productId, dataChoose?.id, payload).then(res => {
            toast.success("Cập nhật thành công");
            handleClose();
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
                toast.error("Upload không thành công!");
            });
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa biến thể sản phẩm: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        {dataChoose &&
                            <>
                                <Row>
                                    <Col>
                                        <label>Tên sản phẩm</label>
                                        <Input defaultValue={dataChoose?.name} onChange={e => onChange('name', e.target.value)} />
                                    </Col>
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
                                            defaultValue={dataChoose?.color?.id}
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
                                            defaultValue={dataChoose?.resolution?.id}
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
                                            defaultValue={dataChoose?.price}
                                            addonAfter="VND"
                                            onChange={e => onChange('price', e)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Màn hình</label><br />
                                        <Select
                                            defaultValue={dataChoose?.display?.id}
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
                                            defaultValue={dataChoose?.graphics_card?.id}
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
                                            defaultValue={dataChoose?.manufacturer?.id}
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
                                            defaultValue={dataChoose?.operating_system?.id}
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
                                            defaultValue={dataChoose?.processor?.id}
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
                                            defaultValue={dataChoose?.ram?.id}
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
                                            defaultValue={dataChoose?.refresh_rate?.id}
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
                                            defaultValue={dataChoose?.storage?.id}
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
                                            src={dataChoose?.images && dataChoose?.images[0]?.url}
                                        />
                                        <Upload {...props}>
                                            <BtnUpload className='mb-2' size='small' style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }} icon={<UploadOutlined />}>Click to Upload</BtnUpload>
                                        </Upload>
                                    </Col>

                                </Row>
                            </>
                        }


                    </Modal.Body>
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