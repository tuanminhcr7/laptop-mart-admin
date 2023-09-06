import { Form, Image, Input, InputNumber, Select, Upload, message } from 'antd';
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

const ModalUpdate = ({ show, handleClose, productId, dataChoose, productName }) => {

    const [masterData, setMasterData] = useState(null);
    const [dataProductVariantShow, setDataProductVariantShow] = useState(null);

    const [productImage, setProductImage] = useState([]);

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {

        });
    }

    const getDataProductVariantShow = async () => {
        Api.productVariantShow(productId, dataChoose?.id).then(res => {
            setDataProductVariantShow(res?.data?.data);
            setProductImage([res?.data?.data?.images[0]?.url])
        }).catch(err => {

        });
    }

    useEffect(() => {
        show && getMasterData();
        show && getDataProductVariantShow();
        show !== true && setDataProductVariantShow(null);
    }, [show]);

    const onFinish = (value) => {
        const payload = {
            name: value?.name,
            weight: value?.weight,
            description: value?.description,
            colorId: value?.colorId,
            price: value?.price,
            images: productImage,
        };
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
                    <Modal.Title>Chỉnh sửa biến thể sản phẩm: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        {dataProductVariantShow &&
                            <>
                                <Form
                                    initialValues={{
                                        name: dataProductVariantShow && dataProductVariantShow?.name,
                                        price: dataProductVariantShow && dataProductVariantShow?.price,
                                        weight: dataProductVariantShow && dataProductVariantShow?.weight,
                                        description: dataProductVariantShow && dataProductVariantShow?.description,
                                        colorId: dataProductVariantShow && dataProductVariantShow?.color?.id,
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
                                        <Col className='mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                                            {/* <Button variant='success' onClick={e => handleShowModalVariant(dataChoose)}>Biến thể</Button> */}
                                            <Button className='mx-1' variant='warning'>
                                                <Link style={{ color: '#fff' }} to={`/products/${productId}/stock-entries/variants/${dataChoose?.id}`}>Kho</Link>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                                            <BtnSubmit title={"Cập nhật"} onclick={handleClose} />
                                        </Col>
                                    </Row>

                                </Form>
                            </>
                        }


                    </Modal.Body>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ModalUpdate;