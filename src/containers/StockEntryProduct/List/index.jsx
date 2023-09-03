import { Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import ModalUpdate from '../Modal/ModalUpdate';
import ModalDetail from '../Modal/ModalDetail';
import ModalDelete from '../Modal/ModalDelete';
// import Modal from '../Modal';

const List = ({ data, productId, productName, onRefresh }) => {

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
        onRefresh();
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
            title: 'Sản phẩm',
            dataIndex: 'recipient_name',
            key: 'name',
            width: 200,
            fixed: 'left',
            render: (text, record) => {
                return productName;
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'description',
            width: 100,
        },
        {
            title: 'Ngày nhập kho',
            dataIndex: 'entry_datetime',
            key: 'weight',
            width: 150,
            render: (text, record) => {
                return moment(text).format("DD/MM/YYYY HH:mm");
            }
        },
        {
            title: 'Giá nhập kho',
            dataIndex: 'entry_price',
            key: 'weight',
            width: 150,
        },
        {
            title: "Thao tác",
            width: 200,
            fixed: 'right',
            render: (record, value) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant='success'
                            onClick={() => {
                                handleShowModalUpdate(record);
                            }}
                        ><EditOutlined className='mb-2' /></Button>
                        <Button
                            className='mx-1'
                            variant='warning'
                            onClick={() => {
                                handleShowModalDetail(record);
                            }}
                        ><EyeOutlined className='mb-2' /></Button>
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
    //         id: 6,
    //         product_id: 6,
    //         quantity: 22,
    //         entry_datetime: "2023-08-15T12:30:22.000Z",
    //         entry_price: 800,
    //         created_at: "2023-08-15T08:09:49.000Z",
    //         product: {
    //             id: 6,
    //             name: "Test API update",
    //             price: 1100,
    //             inventory: 32,
    //             parent: null
    //         }
    //     },
    //     {
    //         id: 4,
    //         product_id: 28,
    //         quantity: 8,
    //         entry_datetime: "2023-08-15T12:30:22.000Z",
    //         entry_price: 800,
    //         created_at: "2023-08-15T07:54:27.000Z",
    //         product: {
    //             id: 28,
    //             name: "Test API - variant 2",
    //             price: 1000,
    //             inventory: 8,
    //             parent: {
    //                 id: 6,
    //                 name: "Test API update",
    //                 price: 1100,
    //                 inventory: 32
    //             }
    //         }
    //     },
    //     {
    //         id: 1,
    //         product_id: 6,
    //         quantity: 10,
    //         entry_datetime: "2023-08-15T12:22:22.000Z",
    //         entry_price: 800,
    //         created_at: "2023-08-15T06:22:02.000Z",
    //         product: {
    //             id: 6,
    //             name: "Test API update",
    //             price: 1100,
    //             inventory: 32,
    //             parent: null
    //         }
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

            <ModalDetail productName={productName} productId={productId} show={showModalDetail} handleClose={handleCloseModalDetail} dataChoose={dataChoose} />
            <ModalUpdate productName={productName} productId={productId} show={showModalUpdate} handleClose={handleCloseModalUpdate} dataChoose={dataChoose} />
            <ModalDelete productName={productName} productId={productId} show={showModalDelete} handleClose={handleCloseModalDelete} dataChoose={dataChoose} />
        </div>
    );
};

export default List;