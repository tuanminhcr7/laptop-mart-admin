import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalUpdate from '../Modal/ModalUpdate.jsx';
import ModalDetail from '../Modal/ModalDetail.jsx';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import Api from '../../../Apis/index.jsx';
import { toast } from 'react-toastify';

const List = ({ data, onRefresh }) => {

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);

    const handleShowModalDetail = (value) => {
        Api.userDetail(value?.id).then(res => {
            setDataDetail(res?.data?.data);
        }).catch(err => {
            toast.error('Có lỗi xảy ra');
        });
        setShowModalDetail(true);
    }
    const handleCloseModalDetail = () => {
        setShowModalDetail(false);
        setDataDetail(null);
    }

    const handleShowModalUpdate = (value) => {
        setDataUpdate(value);
        setShowModalUpdate(true);
    }
    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setDataUpdate(null)
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
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'name',
            width: 100,

        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'name',
            width: 100,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'weight',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'color',
            width: 150,
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'weight',
            width: 100,
            render: (text, record) => {
                switch (text) {
                    case 1:
                        return <div className='text-center bg-warning p-1'>Quản trị</div>
                        break;
                    case 2:
                        return <div className='text-center bg-primary p-1'>Thành viên</div>
                        break;
                    default:
                        break;
                }
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'weight',
            width: 150,
            render: (text, record) => {
                switch (text) {
                    case 1:
                        return <div className='text-center bg-success p-1'>Đang hoạt động</div>
                        break;
                    case 0:
                        return <div className='text-center bg-danger p-1'>Ngừng hoạt động</div>
                        break;
                    default:
                        break;
                }
            }
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
                scroll={{ x: 400 }}
            />
            <ModalUpdate
                onRefresh={onRefresh}
                dataChoose={dataUpdate}
                show={showModalUpdate}
                handleClose={handleCloseModalUpdate}
                handleShow={handleShowModalUpdate}
            />
            <ModalDetail
                dataChoose={dataDetail}
                show={showModalDetail}
                handleClose={handleCloseModalDetail}
                handleShow={handleShowModalDetail}
            />
        </div>
    );
};

export default List;