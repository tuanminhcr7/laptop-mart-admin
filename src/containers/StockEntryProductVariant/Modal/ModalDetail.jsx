import { Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import moment from 'moment';
import { toast } from 'react-toastify';

const ModalDetail = ({ show, handleClose, dataChoose, productName, productId }) => {

    const [dataStockEntryShowProduct, setDataStockEntryShowProduct] = useState(null);

    const getDataStockEntryShowProduct = async () => {
        Api.stockEntriesShow(productId, dataChoose?.id).then(res => {
            setDataStockEntryShowProduct(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    useEffect(() => {
        show && getDataStockEntryShowProduct();
        show !== true && setDataStockEntryShowProduct(null);

    }, [show])

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm kho của: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataStockEntryShowProduct &&
                        <>
                            <Row>
                                <Col>
                                    <label>Số lượng</label>
                                    <div>{dataStockEntryShowProduct?.quantity}</div>

                                </Col>
                                <Col>
                                    <label>Ngày nhập kho</label>
                                    <div>{moment(dataStockEntryShowProduct?.entry_datetime).format("DD/MM/YYYY HH:mm:ss")}</div>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Giá nhập kho</label>
                                    <div>{dataStockEntryShowProduct?.entry_price}</div>
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