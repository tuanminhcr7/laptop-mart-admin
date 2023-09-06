import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BtnSubmit from '../../../components/BtnSubmit';

const ModalCreate = ({ show, handleClose, productId, productName }) => {

    const [masterData, setMasterData] = useState(null);

    const [productImage, setProductImage] = useState([]);

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {

        });
    };

    useEffect(() => {
        show && getMasterData();
        show !== true && setProductImage([]);
    }, [show])

    const onFinish = (value) => {
        const payload = {
            name: value?.name,
            weight: value?.weight,
            description: value?.description,
            colorId: value?.colorId,
            price: value?.price,
            images: productImage,
        };
        Api.productVariantsCreate(productId, payload).then(res => {
            toast.success("Thêm mới thành công");
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
                setProductImage([res?.data?.data[0]])
            }).catch(err => {
                // toast.error("Upload không thành công!");
            });
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới biến thể sản phẩm: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        initialValues={{
                            name: null,
                            weight: null,
                            description: null,
                            colorId: null,
                            price: null,
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
                            <Col></Col>
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
            <ToastContainer />
        </div>
    );
};

export default ModalCreate;