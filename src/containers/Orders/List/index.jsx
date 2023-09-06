import { Table } from 'antd';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import ModalDetail from '../Modal/ModalDetail';

const List = ({ data, onRefresh }) => {

    const [showModalDetail, setShowModalDetail] = useState(false);
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
            title: 'Người nhận',
            dataIndex: 'recipient_name',
            key: 'name',
            width: 200,
            fixed: 'left'
        },
        {
            title: 'SĐT người nhận',
            dataIndex: 'recipient_phone',
            key: 'description',
            width: 150,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_amount',
            key: 'weight',
            width: 100,
        },
        {
            title: 'Địa chỉ giao hàng',
            dataIndex: 'shipping_address',
            key: 'color',
            width: 300,

        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'weight',
            width: 150,
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'weight',
            width: 200,
            render: (text, record) => {
                // export const ORDER = {
                //     STATUS: {
                //       0: 'waiting_for_payment',
                //       1: 'processing',
                //       2: 'shipping',
                //       3: 'completed',
                //       4: 'cancelled'
                //     }
                //   }
                switch (text) {
                    case 0:
                        return <div className='bg-secondary p-1 text-center'>waiting_for_payment</div>
                        break;
                    case 1:
                        return <div className='bg-primary p-1 text-center'>processing</div>
                        break;
                    case 2:
                        return <div className='bg-warning p-1 text-center'>shipping</div>
                        break;
                    case 3:
                        return <div className='bg-success p-1 text-center'>completed</div>
                        break;
                    case 4:
                        return <div className='bg-danger p-1 text-center'>cancelled</div>
                        break;
                    default:
                        break;
                }
            }
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'inventory',
            key: 'weight',
            width: 130,
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

    // const fakeData = [
    //     {
    //         id: 2,
    //         user_id: 2,
    //         status: 2,
    //         recipient_name: "Nguyen Van A",
    //         recipient_phone: "0123456789",
    //         total_amount: 2100,
    //         shipping_address: "219 Trung Kinh, Yen Hoa, Cau Giay, Ha Noi",
    //         note: "Giao hang nhanh",
    //         created_at: "2023-08-29T08:45:08.000Z",
    //         order_items: [
    //             {
    //                 id: 2,
    //                 order_id: 2,
    //                 product_id: 28,
    //                 quantity: 1,
    //                 price: 1000
    //             },
    //             {
    //                 id: 1,
    //                 order_id: 2,
    //                 product_id: 6,
    //                 quantity: 1,
    //                 price: 1100
    //             }
    //         ],
    //         order_payment: null
    //     }
    // ]

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
        </div>
    );
};

export default List;