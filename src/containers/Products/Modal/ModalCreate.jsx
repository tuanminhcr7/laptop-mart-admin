import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import BtnSubmit from '../../../components/BtnSubmit';

const ModalCreate = ({ show, handleClose, formData, setFormData }) => {

    const [masterData, setMasterData] = useState(null);
    const [productImage, setProductImage] = useState([]);

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

    const onFinish = (value) => {
        const payload = {
            name: value?.name,
            weight: value?.weight,
            description: value?.description,
            colorId: value?.colorId,
            displayId: value?.displayId,
            graphicsCardId: value?.graphicsCardId,
            manufacturerId: value?.manufacturerId,
            operatingSystemId: value?.operatingSystemId,
            processorId: value?.processorId,
            ramId: value?.ramId,
            price: value?.price,
            refreshRateId: value?.refreshRateId,
            resolutionId: value?.resolutionId,
            storageId: value?.storageId,
            images: productImage
        };
        // console.log(payload);

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
                setProductImage([res?.data?.data[0]])
            }).catch(err => {

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
                    <Form
                        initialValues={{
                            name: null,
                            weight: null,
                            description: null,
                            colorId: null,
                            displayId: null,
                            graphicsCardId: null,
                            manufacturerId: null,
                            operatingSystemId: null,
                            processorId: null,
                            ramId: null,
                            price: null,
                            refreshRateId: null,
                            resolutionId: null,
                            storageId: null,
                            images: productImage,
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
                                <BtnSubmit title={"Thêm mới"} onclick={handleClose} />
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalCreate;