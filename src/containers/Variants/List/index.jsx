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
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataChoose, setDataChoose] = useState({});

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
            render: (text, record) => {
                return text.toLocaleString('it-IT') + " đ"
            }
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

    return (
        <div className='mt-3'>
            <Table
                bordered
                dataSource={data}
                columns={columns}
                scroll={{ x: 400, y: 400 }}
                pagination={false}
            />
            <ModalUpdate
                productName={productName}
                productId={productId}
                show={showModalUpdate}
                handleClose={handleCloseModalUpdate}
                dataChoose={dataChoose}
            />
            <ModalDelete
                productName={productName}
                productId={productId}
                show={showModalDelete}
                handleClose={handleCloseModalDelete}
                dataChoose={dataChoose}
            />
        </div>
    );
};

export default List;