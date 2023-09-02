import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import List from './List';
import ModalCreate from './Modal/ModalCreate';
import { useParams } from 'react-router-dom';
import Api from '../../Apis';

const Variant = () => {

    const [showModalCreate, setShowModalCreate] = useState(false);
    const url = useParams();
    const productId = url?.id
    const [dataProductVariant, setDataProductVariant] = useState([
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
    ]);
    const [formData, setFormData] = useState({
        name: null,
        weight: null,
        description: null,
        colorId: null,
        images: null,
    });

    const getDataProductVariant = async () => {
        Api.productShow(productId).then(res => {
            setDataProductVariant(res?.data?.data?.variants);
        }).catch(err => {

        });
    }

    useEffect(() => {
        getDataProductVariant();
    }, []);

    const onRefresh = () => {
        getDataProductVariant();
    }

    const handleShowModalCreate = () => {
        setShowModalCreate(true);
    }
    const handleCloseModalCreate = () => {
        setShowModalCreate(false);
        setFormData({
            ...formData,
            name: null,
            weight: null,
            description: null,
            colorId: null,
            images: null,
        });
        onRefresh();
    }

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col><h3>Biến thể sản phẩm</h3></Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button>
                        </Col>
                    </Row>

                    <List onRefresh={onRefresh} productId={productId} data={dataProductVariant} />
                    <ModalCreate productId={productId} show={showModalCreate} handleClose={handleCloseModalCreate} formData={formData} setFormData={setFormData} />
                </Col>
            </Row>
        </div>
    );
};

export default Variant;