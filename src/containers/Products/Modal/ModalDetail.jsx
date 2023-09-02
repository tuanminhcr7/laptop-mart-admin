import { Image, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import { Link } from 'react-router-dom';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataProductShow, setDataProductShow] = useState({
        "id": 6,
        "parent_id": null,
        "name": "Test API update",
        "price": 1100,
        "inventory": 32,
        "quantity_sold": 0,
        "weight": 1.1,
        "description": "description",
        "created_at": "2023-08-14T07:35:52.000Z",
        "updated_at": "2023-08-15T08:31:18.000Z",
        "deleted_at": null,
        "images": [
            {
                "url": "https://storage.googleapis.com/products-service/products/6/images/20230814103313-pom.png"
            }
        ],
        "color": {
            "id": 2,
            "name": "Trắng",
            "hex_code": "F5F5F5"
        },
        "display": {
            "id": 1,
            "size": 13.4
        },
        "graphics_card": {
            "id": 1,
            "name": "VGA NVIDIA"
        },
        "manufacturer": {
            "id": 1,
            "name": "ACER"
        },
        "operating_system": {
            "id": 1,
            "name": "Windows"
        },
        "processor": {
            "id": 1,
            "name": "Intel Core i3"
        },
        "ram": {
            "id": 1,
            "size": 4
        },
        "refresh_rate": {
            "id": 1,
            "rate": 60
        },
        "resolution": {
            "id": 2,
            "name": "Full HD (1920x1080)"
        },
        "storage": {
            "id": 1,
            "type": "SSD",
            "size": 128
        },
        "variants": [
            {
                "id": 27,
                "parent_id": 6,
                "name": null,
                "price": 1000,
                "inventory": 0,
                "quantity_sold": 0,
                "weight": 1,
                "description": "description",
                "created_at": "2023-08-14T09:02:51.000Z",
                "updated_at": "2023-08-14T09:02:51.000Z",
                "deleted_at": null,
                "color": {
                    "id": 1,
                    "name": "Đen",
                    "hex_code": "333333"
                },
                "images": [
                    {
                        "url": "https://storage.googleapis.com/products-service/products/27/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
                    }
                ]
            },
            {
                "id": 28,
                "parent_id": 6,
                "name": "Test API - variant 2",
                "price": 1000,
                "inventory": 8,
                "quantity_sold": 0,
                "weight": 1.05,
                "description": "description variant 2",
                "created_at": "2023-08-14T09:05:48.000Z",
                "updated_at": "2023-08-15T07:56:27.000Z",
                "deleted_at": null,
                "color": {
                    "id": 3,
                    "name": "Bạc",
                    "hex_code": "B0B0B0"
                },
                "images": [
                    {
                        "url": "https://storage.googleapis.com/products-service/products/28/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
                    }
                ]
            },
            {
                "id": 29,
                "parent_id": 6,
                "name": "Test API - variant 3",
                "price": 1000,
                "inventory": 0,
                "quantity_sold": 0,
                "weight": 1.05,
                "description": "description variant 3",
                "created_at": "2023-08-14T09:10:16.000Z",
                "updated_at": "2023-08-14T09:10:16.000Z",
                "deleted_at": null,
                "color": {
                    "id": 2,
                    "name": "Trắng",
                    "hex_code": "F5F5F5"
                },
                "images": [
                    {
                        "url": "https://storage.googleapis.com/products-service/products/29/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
                    }
                ]
            }
        ]
    });

    const getProductShow = async () => {
        Api.productShow(dataChoose?.id).then(res => {
            setDataProductShow(res?.data?.data);

        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        show && getProductShow();
    });

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Tên sản phẩm</label>
                            {/* <Input defaultValue={dataChoose?.name} onChange={e => onChange('name', e.target.value)} /> */}
                            <div>{dataProductShow?.name}</div>
                        </Col>
                        <Col>
                            <label>Mô tả</label>
                            <div>{dataProductShow?.description}</div>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Cân nặng</label>
                            <div>{dataProductShow?.weight} Kg</div>
                        </Col>
                        <Col>
                            <label>Màu sắc</label><br />
                            <div>{dataProductShow?.color?.name}</div>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <div>{dataProductShow?.resolution?.name}</div>

                        </Col>
                        <Col>
                            <label>Giá</label>
                            <div>{dataProductShow?.price}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <label className=''>Hình ảnh</label><br></br>
                            <Image
                                preview={false}
                                width={100}
                                src={dataProductShow?.images[0]?.url}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                            {/* <Button variant='success' onClick={e => handleShowModalVariant(dataChoose)}>Biến thể</Button> */}
                            <Button className='mx-1' variant='warning'>
                                <Link style={{ color: '#fff' }} to={`/products/${dataChoose?.id}/stock-entries`}>Kho</Link>
                            </Button>
                            <Button variant='success'>
                                <Link style={{ color: '#fff' }} to={`/products/${dataChoose?.id}/variants`}>Biến thể</Link>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDetail;