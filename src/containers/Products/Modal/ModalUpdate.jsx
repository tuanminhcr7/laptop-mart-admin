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

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [showModalVariant, setShowModalVarial] = useState(false);
    const [itemVariantSelected, setItemVariantSelected] = useState(null);
    const [masterData, setMasterData] = useState({
        "colors": [
            {
                "id": 1,
                "name": "Đen",
                "hex_code": "333333"
            },
            {
                "id": 2,
                "name": "Trắng",
                "hex_code": "F5F5F5"
            },
            {
                "id": 3,
                "name": "Bạc",
                "hex_code": "B0B0B0"
            },
            {
                "id": 4,
                "name": "Xám",
                "hex_code": "A0A0A0"
            },
            {
                "id": 5,
                "name": "Xanh dương",
                "hex_code": "3399FF"
            },
            {
                "id": 6,
                "name": "Xanh lá cây",
                "hex_code": "66CC66"
            },
            {
                "id": 7,
                "name": "Đỏ",
                "hex_code": "FF6666"
            },
            {
                "id": 8,
                "name": "Vàng",
                "hex_code": "FFFF99"
            },
            {
                "id": 9,
                "name": "Hồng",
                "hex_code": "FFCCCC"
            },
            {
                "id": 10,
                "name": "Tím",
                "hex_code": "CC99FF"
            },
            {
                "id": 11,
                "name": "Cam",
                "hex_code": "FFB266"
            },
            {
                "id": 12,
                "name": "Nâu",
                "hex_code": "8B4513"
            },
            {
                "id": 13,
                "name": "Be",
                "hex_code": "ECE0D1"
            },
            {
                "id": 14,
                "name": "Xám đen",
                "hex_code": "666666"
            },
            {
                "id": 15,
                "name": "Xám bạc",
                "hex_code": "CCCCCC"
            },
            {
                "id": 16,
                "name": "Xanh cốm",
                "hex_code": "66FF99"
            }
        ],
        "displays": [
            {
                "id": 1,
                "size": 13.4
            },
            {
                "id": 4,
                "size": 14
            },
            {
                "id": 5,
                "size": 14.2
            },
            {
                "id": 2,
                "size": 14.5
            },
            {
                "id": 3,
                "size": 15.4
            },
            {
                "id": 6,
                "size": 15.6
            },
            {
                "id": 8,
                "size": 16
            },
            {
                "id": 7,
                "size": 16.2
            },
            {
                "id": 9,
                "size": 17
            },
            {
                "id": 10,
                "size": 17.3
            },
            {
                "id": 11,
                "size": 18
            }
        ],
        "graphics_cards": [
            {
                "id": 2,
                "name": "VGA AMD"
            },
            {
                "id": 1,
                "name": "VGA NVIDIA"
            },
            {
                "id": 3,
                "name": "VGA Tích Hợp (Onboard)"
            }
        ],
        "manufacturers": [
            {
                "id": 1,
                "name": "ACER"
            },
            {
                "id": 2,
                "name": "APPLE"
            },
            {
                "id": 3,
                "name": "ASUS"
            },
            {
                "id": 4,
                "name": "CONCEPTD"
            },
            {
                "id": 5,
                "name": "DELL"
            },
            {
                "id": 6,
                "name": "GIGABYTE"
            },
            {
                "id": 7,
                "name": "HP"
            },
            {
                "id": 8,
                "name": "LENOVO"
            },
            {
                "id": 9,
                "name": "LG"
            },
            {
                "id": 10,
                "name": "MSI"
            }
        ],
        "operating_systems": [
            {
                "id": 3,
                "name": "Dos"
            },
            {
                "id": 2,
                "name": "Linux"
            },
            {
                "id": 4,
                "name": "Mac OS"
            },
            {
                "id": 1,
                "name": "Windows"
            }
        ],
        "processors": [
            {
                "id": 6,
                "name": "AMD Ryzen 5"
            },
            {
                "id": 7,
                "name": "AMD Ryzen 7"
            },
            {
                "id": 8,
                "name": "AMD Ryzen 9"
            },
            {
                "id": 9,
                "name": "Apple M1"
            },
            {
                "id": 11,
                "name": "Apple M2 max"
            },
            {
                "id": 10,
                "name": "Apple M2 pro"
            },
            {
                "id": 1,
                "name": "Intel Core i3"
            },
            {
                "id": 2,
                "name": "Intel Core i5"
            },
            {
                "id": 3,
                "name": "Intel Core i7"
            },
            {
                "id": 4,
                "name": "Intel Core i9"
            },
            {
                "id": 5,
                "name": "Intel Xeon"
            }
        ],
        "rams": [
            {
                "id": 1,
                "size": 4
            },
            {
                "id": 2,
                "size": 8
            },
            {
                "id": 3,
                "size": 16
            },
            {
                "id": 4,
                "size": 32
            },
            {
                "id": 5,
                "size": 64
            },
            {
                "id": 6,
                "size": 128
            },
            {
                "id": 7,
                "size": 256
            },
            {
                "id": 8,
                "size": 512
            }
        ],
        "refresh_rates": [
            {
                "id": 1,
                "rate": 60
            },
            {
                "id": 2,
                "rate": 75
            },
            {
                "id": 3,
                "rate": 90
            },
            {
                "id": 4,
                "rate": 120
            },
            {
                "id": 5,
                "rate": 144
            },
            {
                "id": 6,
                "rate": 165
            },
            {
                "id": 7,
                "rate": 240
            },
            {
                "id": 8,
                "rate": 300
            },
            {
                "id": 9,
                "rate": 360
            }
        ],
        "resolutions": [
            {
                "id": 6,
                "name": "2.8K (2880x1800)"
            },
            {
                "id": 12,
                "name": "3k (3200x2000)"
            },
            {
                "id": 11,
                "name": "4K (3840x2160)"
            },
            {
                "id": 2,
                "name": "Full HD (1920x1080)"
            },
            {
                "id": 1,
                "name": "HD (1366x768)"
            },
            {
                "id": 7,
                "name": "Retina (2560x1600)"
            },
            {
                "id": 9,
                "name": "Retina (2880x1800)"
            },
            {
                "id": 8,
                "name": "Retina 14\" (3024x1964)"
            },
            {
                "id": 10,
                "name": "Retina 16\" (3456x2234)"
            },
            {
                "id": 4,
                "name": "WQHD (2560x1440)"
            },
            {
                "id": 5,
                "name": "WQXGA (2560x1600)"
            },
            {
                "id": 3,
                "name": "WUXGA (1920x1200)"
            }
        ],
        "storages": [
            {
                "id": 1,
                "type": "SSD",
                "size": 128
            },
            {
                "id": 2,
                "type": "SSD",
                "size": 256
            },
            {
                "id": 3,
                "type": "SSD",
                "size": 512
            },
            {
                "id": 4,
                "type": "SSD",
                "size": 1024
            },
            {
                "id": 5,
                "type": "SSD",
                "size": 2048
            },
            {
                "id": 6,
                "type": "HDD",
                "size": 128
            },
            {
                "id": 7,
                "type": "HDD",
                "size": 256
            },
            {
                "id": 8,
                "type": "HDD",
                "size": 512
            },
            {
                "id": 9,
                "type": "HDD",
                "size": 1024
            },
            {
                "id": 10,
                "type": "HDD",
                "size": 2048
            }
        ]
    });
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
        images: dataProductShow?.images[0]?.url
    });

    const getMasterData = async () => {
        Api.masterData().then(res => {
            // setMasterData(res?.data?.data);
        }).catch(err => {

        });
    }
    const getProductShow = async () => {
        Api.productShow(dataChoose?.id).then(res => {
            setDataProductShow(res?.data?.data);

        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        show && getMasterData();
        show && getProductShow();
    })

    const handleShowModalVariant = (value) => {
        setShowModalVarial(true);
        setItemVariantSelected(value)
    }

    const handleCloseModalVariant = () => {
        setShowModalVarial(false);
        setItemVariantSelected(null);
    }

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataProductShow);
        newDataChoose[name] = value;
        console.log(newDataChoose);
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
            images: newDataChoose?.images[0]?.url
        });
    }

    const onFinish = () => {
        console.log(formData);
        const payload = { ...formData };
        Api.productEdit(dataProductShow?.id, payload).then(res => {
            handleClose();
            toast.success("Cập nhật thành công");
        }).catch(err => {

        });
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    return <Select.Option value={item?.id}>{item?.size}</Select.Option>

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