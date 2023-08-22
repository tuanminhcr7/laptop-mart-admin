import { Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
// import Modal from '../Modal';

const List = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            fixed: 'left'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'age',
            key: 'age',
            width: 200,
            fixed: 'left'
        },
        {
            title: 'Mô tả',
            dataIndex: 'address',
            key: 'address',
            width: 200,
        },
        {
            title: 'Cân nặng',
            dataIndex: 'index',
            key: 'index',
            width: 100,
        },
        {
            title: 'Màu sắc',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        },
        {
            title: 'Màn hình',
            dataIndex: 'address',
            width: 150,
            key: 'address',
        },
        {
            title: 'Hãng',
            dataIndex: 'index',
            key: 'index',
            width: 150,
        },
        {
            title: 'Hệ điều hành',
            dataIndex: 'age',
            key: 'age',
            width: 150,
        },
        {
            title: 'Hiệu năng',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Ram',
            dataIndex: 'index',
            key: 'index',
            width: 100,
        },
        {
            title: 'Tốc độ',
            dataIndex: 'age',
            key: 'age',
            width: 100,
        },
        {
            title: 'Độ phân giải',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Ổ cứng',
            dataIndex: 'index',
            key: 'index',
            width: 150,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'age',
            key: 'age',
            width: 150,
        },
        {
            title: "Thao tác",
            width: 100,
            fixed: 'right'
        }
    ];

    return (
        <div className='mt-3'>
            <Table
                // dataSource={}
                columns={columns}
                scroll={{ x: 400 }}
            />
            {/* <Modal show={show} handleClose={handleClose} handleShow={handleShow} /> */}
        </div>
    );
};

export default List;