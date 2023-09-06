import { Image, Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ModalUpdate from '../Modal/ModalUpdate';
import ModalDetail from '../Modal/ModalDetail';
import ModalDelete from '../Modal/ModalDelete';
// import Modal from '../Modal';

const List = ({ data, onRefresh }) => {

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataChoose, setDataChoose] = useState(null);

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
            title: 'Hình ảnh',
            dataIndex: 'color',
            key: 'color',
            width: 100,
            render: (text, record) => {
                return <Image
                    preview={false}
                    src={record?.images[0]?.url}
                    width={50}
                />;
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

    const fakeData = [
        {
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
            "deleted_at": null
        }
    ]

    return (
        <div className='mt-3'>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                scroll={{ x: 400, y: 400 }}
                pagination={false}
            />

            <ModalDetail
                show={showModalDetail}
                handleClose={handleCloseModalDetail}
                dataChoose={dataChoose}
            />
            <ModalUpdate
                show={showModalUpdate}
                handleClose={handleCloseModalUpdate}
                dataChoose={dataChoose}
            />
            <ModalDelete show={showModalDelete}
                handleClose={handleCloseModalDelete}
                dataChoose={dataChoose}
            />
        </div>
    );
};

export default List;