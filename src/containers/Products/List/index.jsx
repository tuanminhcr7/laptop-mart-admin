import { Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ModalUpdate from '../Modal/ModalUpdate';
import ModalDetail from '../Modal/ModalDetail';
import ModalDelete from '../Modal/ModalDelete';
// import Modal from '../Modal';

const List = () => {

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
    }
    const handleShowModalDelete = (value) => {
        setShowModalDelete(true);
        setDataChoose(value);
    }
    const handleCloseModalDelete = () => {
        setShowModalDelete(false);
        setDataChoose(null);
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
            dataIndex: 'color',
            key: 'color',
            width: 100,
        },
        {
            title: 'Màn hình',
            dataIndex: 'display',
            width: 150,
            key: 'display',
        },
        {
            title: 'Hãng',
            dataIndex: 'manufacture',
            key: 'manufacture',
            width: 150,
        },
        {
            title: 'Hệ điều hành',
            dataIndex: 'operating_system',
            key: 'operating_system',
            width: 150,
        },
        {
            title: 'Hiệu năng',
            dataIndex: 'processor',
            key: 'processor',
            width: 150,
        },
        {
            title: 'Ram',
            dataIndex: 'ram',
            key: 'ram',
            width: 100,
        },
        {
            title: 'Tốc độ',
            dataIndex: 'refresh_rate',
            key: 'refresh_rate',
            width: 100,
        },
        {
            title: 'Độ phân giải',
            dataIndex: 'resolution',
            key: 'resolution',
            width: 150,
        },
        {
            title: 'Ổ cứng',
            dataIndex: 'storage',
            key: 'storage',
            width: 150,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
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

    const fakeData = [
        {
            id: 1,
            name: "Test API",
            price: 1000,
            weight: 1,
            description: "description",
            color: "Trắng",
            colorId: 2,
            display: "15.6 inches",
            graphics_card: 'RTX 3060',
            manufacture: 'Asus',
            operating_system: 'Window 10',
            processor: 'hight',
            ram: '32GB',
            refresh_rate: '114 Hz',
            resolutionId: 3,
            resolution: '8K',
            storage: '1TGB SSD',
            images: ''
        },
        {
            id: 2,
            name: "Test API",
            price: 1000,
            weight: 1,
            description: "description",
            color: "Đen",
            colorId: 3,
            display: "15.6 inches",
            graphics_card: 'RTX 3060',
            manufacture: 'Asus',
            operating_system: 'Window 10',
            processor: 'hight',
            ram: '32GB',
            refresh_rate: 'hight',
            resolutionId: 1,
            resolution: 'Full HD',
            storage: '1TGB SSD',
            images: ''
        },
    ]

    return (
        <div className='mt-3'>
            {/* <Table striped style={{}} bordered >
                <thead>
                    <tr>
                        <th style={{ width: 40 }}>#</th>
                        {columns.map((item, index) => (
                            <th style={{ width: item?.width }} key={index}>{item?.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td style={{ width: 200 }} key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td style={{ width: 200 }} key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <td style={{ width: 200 }} key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
            </Table> */}
            <Table
                bordered
                dataSource={fakeData}
                columns={columns}
                scroll={{ x: 400 }}
            />

            <ModalDetail show={showModalDetail} handleClose={handleCloseModalDetail} dataChoose={dataChoose} />
            <ModalUpdate show={showModalUpdate} handleClose={handleCloseModalUpdate} dataChoose={dataChoose} />
            <ModalDelete show={showModalDelete} handleClose={handleCloseModalDelete} dataChoose={dataChoose} />
        </div>
    );
};

export default List;