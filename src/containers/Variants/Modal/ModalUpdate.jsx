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

    const [eventOnChange, setEvenOnChange] = useState(false);
    const [masterData, setMasterData] = useState(null);
    const [dataProductVariantShow, setDataProductVariantShow] = useState(null);
    const [formData, setFormData] = useState({
        name: dataProductVariantShow && dataProductVariantShow?.name,
        price: dataProductVariantShow && dataProductVariantShow?.price,
        weight: dataProductVariantShow && dataProductVariantShow?.weight,
        description: dataProductVariantShow && dataProductVariantShow?.description,
        colorId: dataProductVariantShow && dataProductVariantShow?.color?.id,
        images: dataProductVariantShow && dataProductVariantShow?.images && dataProductVariantShow?.images[0]?.url
    });
    // console.log(dataChoose);

    const getMasterData = async () => {
        Api.masterData().then(res => {
            setMasterData(res?.data?.data);
        }).catch(err => {

        });
    }

    const getDataProductVariantShow = async () => {
        Api.productVariantShow(productId, dataChoose?.id).then(res => {
            setDataProductVariantShow(res?.data?.data);
        }).catch(err => {

        });
    }

    useEffect(() => {
        show && getMasterData();
        show && getDataProductVariantShow();
        show !== true && setDataProductVariantShow(null);
    }, [show]);
    // console.log(dataProductVariantShow);

    const onChange = (name, value) => {
        setEvenOnChange(true);
        const newDataChoose = _.clone(dataProductVariantShow);
        newDataChoose[name] = value;
        setFormData({
            name: newDataChoose && newDataChoose?.name,
            price: newDataChoose && newDataChoose?.price,
            weight: newDataChoose && newDataChoose?.weight,
            description: newDataChoose && newDataChoose?.description,
            colorId: newDataChoose && newDataChoose?.colorId || newDataChoose?.color?.id,
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
                                <Row>
                                    <Col>
                                        <label>Tên sản phẩm</label>
                                        <Input defaultValue={dataProductVariantShow?.name} onChange={e => onChange('name', e.target.value)} />
                                    </Col>
                                    <Col>
                                        <label>Mô tả</label>
                                        <TextArea
                                            defaultValue={dataProductVariantShow?.description}
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
                                            defaultValue={dataProductVariantShow?.weight}
                                            addonAfter="Kg"
                                            onChange={e => onChange('weight', e)}
                                        />
                                    </Col>
                                    <Col>
                                        <label>Màu sắc</label><br />
                                        <Select
                                            defaultValue={dataProductVariantShow?.color?.id}
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
                                        <label>Giá</label><br />
                                        <InputNumber
                                            defaultValue={dataProductVariantShow?.price}
                                            addonAfter="VND"
                                            onChange={e => onChange('price', e)}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                                        <label className=''>Hình ảnh</label>
                                        <Image
                                            width={100}
                                            preview={false}
                                            src={dataProductVariantShow?.images && dataProductVariantShow?.images[0]?.url}
                                        />
                                        <Upload {...props}>
                                            <BtnUpload className='mb-2' size='small' style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }} icon={<UploadOutlined />}>Click to Upload</BtnUpload>
                                        </Upload>
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