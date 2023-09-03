import { Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import moment from 'moment';
import { toast } from 'react-toastify';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataStockEntryShow, setDataStockEntryShow] = useState(null);


    const getDataStockEntryShow = async () => {
        Api.stockEntriesShow(dataChoose?.product_id, dataChoose?.id).then(res => {
            setDataStockEntryShow(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    useEffect(() => {
        show && getDataStockEntryShow();
        show !== true && setDataStockEntryShow(null);
    }, [show]);

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataStockEntryShow &&
                        <>
                            <Row>
                                <Col>
                                    <label>Số lượng</label>
                                    <div>{dataStockEntryShow?.quantity}</div>

                                </Col>
                                <Col>
                                    <label>Ngày nhập kho</label>
                                    <div>{moment(dataStockEntryShow?.entry_datetime).format("DD/MM/YYYY HH:mm:ss")}</div>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Giá nhập kho</label>
                                    <div>{dataStockEntryShow?.entry_price}</div>
                                </Col>
                                <Col></Col>
                            </Row>
                        </>
                    }
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