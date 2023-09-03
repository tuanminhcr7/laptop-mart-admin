import { Image, Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ModalCreate from '../Modal/ModalCreate';
import ModalUpdate from '../Modal/ModalUpdate';
import ModalDelete from '../Modal/ModalDelete';
// import Modal from '../Modal';

const List = ({ productId, data, onRefresh, productName }) => {

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataChoose, setDataChoose] = useState({});

    const handleShowModalDetail = (value) => {
        setShowModalDetail(true);
        setDataChoose(value)
    }
    const handleCloseModalDetail = () => {
        setShowModalDetail(false);
        setDataChoose(null);
    }

    const handleShowModalUpdate = (value) => {
        setShowModalUpdate(true);
        setDataChoose(value);
    }
    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setDataChoose(null);
        onRefresh();
    }
    const handleShowModalDelete = (value) => {
        setShowModalDelete(true);
        setDataChoose(value);
    }
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setDataChoose(null);
        onRefresh();
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            fixed: 'left',
            render: (record, value, index) => {
                return <div style={{ textAlign: 'center' }}>{index + 1}</div>;
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            fixed: 'left'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
        },
        {
            title: 'Cân nặng',
            dataIndex: 'weight',
            key: 'weight',
            width: 100,
        },
        {
            title: 'Màu sắc',
            dataIndex: 'weight',
            key: 'weight',
            width: 100,
            render: (text, record) => {
                return <div className='p-3' style={{ background: `#${record?.color?.hex_code}` }}></div>
            }
        },
        {
            title: 'Số lượng bán',
            dataIndex: 'quantity_sold',
            key: 'weight',
            width: 120,
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'weight',
            width: 120,
        },
        {
            title: 'Hàng tồn kho',
            dataIndex: 'inventory',
            key: 'weight',
            width: 130,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'weight',
            width: 130,
            render: (text, record) => {
                return (
                    <>
                        {record?.images?.map(item => {
                            return <Image
                                width={50}
                                preview={false}
                                src={`${item?.url}`}
                            />
                        })}
                    </>
                );
            }
        },
        {
            title: "Thao tác",
            width: 100,
            fixed: 'right',
            render: (record, value) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            className='mx-1'
                            variant='success'
                            onClick={() => {
                                handleShowModalUpdate(record);
                            }}
                        ><EditOutlined className='mb-2' /></Button>
                        {/* <Button
                            className='mx-1'
                            variant='warning'
                            onClick={() => {
                                handleShowModalDetail(record);
                            }}
                        ><EyeOutlined className='mb-2' /></Button> */}
                        <Button
                            variant='danger'
                            onClick={() => {
                                handleShowModalDelete(record);
                            }}
                        ><DeleteOutlined className='mb-2' /></Button>
                    </div>
                );
            }
        }
    ];

    // const fakeData = [
    //     {
    //         id: 27,
    //         parent_id: 6,
    //         name: null,
    //         price: 1000,
    //         inventory: 0,
    //         quantity_sold: 0,
    //         weight: 1,
    //         description: "description",
    //         created_at: "2023-08-14T09:02:51.000Z",
    //         updated_at: "2023-08-14T09:02:51.000Z",
    //         deleted_at: null,
    //         color: {
    //             id: 1,
    //             name: "Đen",
    //             hex_code: "333333"
    //         },
    //         images: [
    //             {
    //                 url: "https://storage.googleapis.com/products-service/products/27/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
    //             }
    //         ]
    //     },
    //     {
    //         id: 28,
    //         parent_id: 6,
    //         name: "Test API - variant 2",
    //         price: 1000,
    //         inventory: 8,
    //         quantity_sold: 0,
    //         weight: 1.05,
    //         description: "description variant 2",
    //         created_at: "2023-08-14T09:05:48.000Z",
    //         updated_at: "2023-08-15T07:56:27.000Z",
    //         deleted_at: null,
    //         color: {
    //             id: 3,
    //             name: "Bạc",
    //             hex_code: "B0B0B0"
    //         },
    //         images: [
    //             {
    //                 url: "https://storage.googleapis.com/products-service/products/28/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
    //             }
    //         ]
    //     },
    //     {
    //         id: 29,
    //         parent_id: 6,
    //         name: "Test API - variant 3",
    //         price: 1000,
    //         inventory: 0,
    //         quantity_sold: 0,
    //         weight: 1.05,
    //         description: "description variant 3",
    //         created_at: "2023-08-14T09:10:16.000Z",
    //         updated_at: "2023-08-14T09:10:16.000Z",
    //         deleted_at: null,
    //         color: {
    //             id: 2,
    //             name: "Trắng",
    //             hex_code: "F5F5F5"
    //         },
    //         images: [
    //             {
    //                 url: "https://storage.googleapis.com/products-service/products/29/images/20230814040623-DreamShaper_v6_pomeranian_black_white_like_stand_on_foots_hand_1.jpg"
    //             }
    //         ]
    //     }
    // ]

    return (
        <div className='mt-3'>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                scroll={{ x: 400 }}
            />
            <ModalUpdate productName={productName} productId={productId} show={showModalUpdate} handleClose={handleCloseModalUpdate} dataChoose={dataChoose} />
            <ModalDelete productName={productName} productId={productId} show={showModalDelete} handleClose={handleCloseModalDelete} dataChoose={dataChoose} />
        </div>
    );
};

export default List;