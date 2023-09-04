import { Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataOrderDetail, setDataOrderDetail] = useState(null);

    const getDataOrderDetail = async () => {
        Api.orderShow(dataChoose?.id).then(res => {
            setDataOrderDetail(res?.data?.data);
        }).catch(err => {

        });
    }

    useEffect(() => {
        show && getDataOrderDetail();
        show !== true && setDataOrderDetail(null);
    }, [show]);

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
                            <label>Số tiền</label><br />
                            <div>{dataOrderDetail?.total_amount}</div>
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