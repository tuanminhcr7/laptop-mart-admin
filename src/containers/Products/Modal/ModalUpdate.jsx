import { Form, Image, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import BtnSubmit from '../../../components/BtnSubmit';

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [masterData, setMasterData] = useState(null);
    const [dataProductShow, setDataProductShow] = useState(null);
    const [loading, setLoading] = useState(false);

    const [productImage, setProductImage] = useState([])

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
            setProductImage([res?.data?.data?.images[0]?.url])
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



    const onFinish = (value) => {
        const payload = {
            name: value?.name,
            price: value?.price,
            weight: value?.weight,
            description: value?.description,
            colorId: value?.colorId,
            displayId: value?.displayId,
            graphicsCardId: value?.graphicsCardId,
            manufacturerId: value?.manufacturerId,
            operatingSystemId: value?.operatingSystemId,
            processorId: value?.processorId,
            ramId: value?.ramId,
            refreshRateId: value?.refreshRateId,
            resolutionId: value?.resolutionId,
            storageId: value?.storageId,
            images: productImage
        };
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
                setProductImage([res?.data?.data[0]])
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
                                <Form
                                    initialValues={{
                                        name: dataProductShow && dataProductShow?.name,
                                        price: dataProductShow && dataProductShow?.price,
                                        weight: dataProductShow && dataProductShow?.weight,
                                        description: dataProductShow && dataProductShow?.description,
                                        colorId: dataProductShow && dataProductShow?.color?.id,
                                        displayId: dataProductShow && dataProductShow?.display?.id,
                                        graphicsCardId: dataProductShow && dataProductShow?.graphics_card?.id,
                                        manufacturerId: dataProductShow && dataProductShow?.manufacturer?.id,
                                        operatingSystemId: dataProductShow && dataProductShow?.operating_system?.id,
                                        processorId: dataProductShow && dataProductShow?.processor?.id,
                                        ramId: dataProductShow && dataProductShow?.ram?.id,
                                        refreshRateId: dataProductShow && dataProductShow?.refresh_rate?.id,
                                        resolutionId: dataProductShow && dataProductShow?.resolution?.id,
                                        storageId: dataProductShow && dataProductShow?.storage?.id,
                                        images: productImage
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Row>
                                        <Col>
                                            <label>Tên sản phẩm</label>
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"name"}>
                                                <Input />
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Mô tả</label>
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"description"}>
                                                <TextArea />
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Cân nặng</label>
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"weight"}>
                                                <InputNumber addonAfter="Kg" />
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Màu sắc</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"colorId"}>

                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.colors?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Độ phân giải</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"resolutionId"}>

                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.resolutions?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col>
                                            <label>Giá</label>
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"price"}>
                                                <InputNumber
                                                    addonAfter="VND"
                                                />
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Màn hình</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"displayId"}>
                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.displays?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.size} Inches</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Card đồ họa</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"graphicsCardId"}>
                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.graphics_cards?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Hãng sản xuất</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"manufacturerId"}>
                                                <Select

                                                    style={{ width: '100%' }}

                                                >
                                                    {masterData?.manufacturers?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Hệ điều hành</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"operatingSystemId"}>
                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.operating_systems?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Bộ vi xử lý</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name="processorId">
                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.processors?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Ram</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"ramId"}>
                                                <Select

                                                    style={{ width: '100%' }}
                                                >
                                                    {masterData?.rams?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.size} GB</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Tần số quét</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"refreshRateId"}>
                                                <Select

                                                    style={{ width: '100%' }}

                                                >
                                                    {masterData?.refresh_rates?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.rate} Hz</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                        <Col>
                                            <label>Bộ nhớ</label><br />
                                            <Form.Item
                                                rules={[
                                                    { required: true, message: "Không được để trống" }
                                                ]}
                                                name={"storageId"}>
                                                <Select

                                                    style={{ width: '100%' }}

                                                >
                                                    {masterData?.storages?.map(item => {
                                                        return <Select.Option value={item?.id}>{item?.size} GB - {item?.type}</Select.Option>
                                                    })}
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                                            <label className=''>Hình ảnh</label>
                                            <Image
                                                width={100}
                                                src={productImage}
                                                preview={false}
                                            />
                                            <Form.Item>
                                                <Upload {...props}>
                                                    <BtnUpload className='mb-2' size='small' style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }} icon={<UploadOutlined />}>Click to Upload</BtnUpload>
                                                </Upload>
                                            </Form.Item>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                                            <BtnSubmit title={"Cập nhật"} onclick={handleClose} />
                                        </Col>
                                    </Row>
                                </Form>
                            </Spin>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ModalUpdate;