import { Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataOrderDetail, setDataOrderDetail] = useState({
        "id": 2,
        "user_id": 2,
        "status": 0,
        "recipient_name": "Nguyen Van A",
        "recipient_phone": "0123456789",
        "total_amount": 2100,
        "shipping_address": "219 Trung Kinh, Yen Hoa, Cau Giay, Ha Noi",
        "note": "Giao hang nhanh",
        "created_at": "2023-08-29T08:45:08.000Z",
        "order_items": [
            {
                "id": 1,
                "order_id": 2,
                "product_id": 6,
                "quantity": 1,
                "price": 1100
            },
            {
                "id": 2,
                "order_id": 2,
                "product_id": 28,
                "quantity": 1,
                "price": 1000
            }
        ],
        "order_payment": null
    });

    const getDataOrderDetail = async () => {
        Api.orderShow(dataChoose?.id).then(res => {
            // setDataOrderDetail(res?.data?.data);
        }).catch(err => {

        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Người nhận</label>
                            <div>{dataOrderDetail?.recipient_name}</div>
                        </Col>
                        <Col>
                            <label>Số điện thoại</label>
                            <div>{dataOrderDetail?.recipient_phone}</div>

                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Địa chỉ</label>
                            <div>{dataOrderDetail?.shipping_address}</div>
                        </Col>
                        <Col>
                            <label>Tổng cộng</label><br />
                            <div>{dataOrderDetail?.total_amount}</div>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <Input disabled value={dataChoose?.resolution} />
                        </Col>
                        <Col>
                            <label>Giá</label>
                            <InputNumber
                                disabled
                                value={dataChoose?.price}
                                addonAfter="VND"
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Thoát
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalDetail;