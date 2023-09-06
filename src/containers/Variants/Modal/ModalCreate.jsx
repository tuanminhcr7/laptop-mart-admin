import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import BtnUpload from 'antd/es/button';
import Api from '../../../Apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalCreate = ({ show, handleClose, formData, setFormData, productId, productName }) => {

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

        });
    };

    useEffect(() => {
        show && getMasterData();
    }, [show])

    const onFinish = () => {
        const payload = { ...formData };
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
                    <Modal.Title>Thêm mới biến thể sản phẩm: {productName}</Modal.Title>
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
                        <Col className='mt-2'>
                            <label>Giá</label><br />
                            <InputNumber
                                addonAfter="VND"
                                onChange={e => onChange('price', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <label className=''>Hình ảnh</label>
                            <Upload {...props}>
                                <BtnUpload
                                    className='mb-2'
                                    size='small'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 10
                                    }}
                                    icon={<UploadOutlined />}
                                >Click to Upload</BtnUpload>
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
            <ToastContainer />
        </div>
    );
};

export default ModalCreate;