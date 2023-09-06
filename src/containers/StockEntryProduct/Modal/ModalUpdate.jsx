import { DatePicker, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import { Button as BtnUpdate } from 'antd'

const ModalUpdate = ({ show, handleClose, dataChoose, productId, productName }) => {


    const [dataStockEntryShow, setDataStockEntryShow] = useState(null);
    const [formData, setFormData] = useState({
        quantity: dataStockEntryShow?.quantity,
        entryDatetime: moment(dataStockEntryShow?.entry_datetime).format("YYYY-MM-DD HH:mm:ss"),
        entryPrice: dataStockEntryShow?.entry_price
    })

    const getDataStockEntryShow = async () => {
        Api.stockEntriesShow(productId, dataChoose?.id).then(res => {
            setDataStockEntryShow(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }
    // console.log(dataStockEntryShow);

    useEffect(() => {
        show && getDataStockEntryShow();
        show !== true && setDataStockEntryShow(null);
    }, [show])

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataStockEntryShow);
        newDataChoose[name] = value;
        setFormData({
            quantity: newDataChoose?.quantity || newDataChoose?.quantity,
            entryDatetime: moment(newDataChoose?.entryDatetime)?._i || moment(newDataChoose?.entry_datetime)?._i,
            entryPrice: newDataChoose?.entryPrice || newDataChoose?.entry_price
        });
    }

    const onFinish = (value) => {
        const payload = {
            quantity: value?.quantity,
            entryDatetime: moment(value?.entryDatetime)?._i,
            entryPrice: value?.entryPrice
        };
        // console.log(payload);
        Api.stockEntriesUpdate(productId, dataChoose?.id, payload).then(res => {
            handleClose();
            toast.success("Cập nhật thành công!");
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm kho: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataStockEntryShow &&
                        <>
                            <Form
                                onFinish={onFinish}
                                initialValues={{
                                    quantity: dataStockEntryShow && dataStockEntryShow?.quantity,
                                    entryDatetime: moment(dataStockEntryShow && dataStockEntryShow?.entry_datetime),
                                    entryPrice: dataStockEntryShow && dataStockEntryShow?.entry_price
                                }}
                            >
                                <Row>
                                    <Col>
                                        <label>Số lượng</label>
                                        <Form.Item
                                            name={"quantity"}
                                        >
                                            <Input

                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col>
                                        <label>Ngày nhập kho</label>
                                        <Form.Item
                                            name={"entryDatetime"}
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Giá nhập kho</label>
                                        <Form.Item
                                            name={"entryPrice"}
                                        >
                                            <InputNumber
                                                addonAfter="$"
                                            />
                                        </Form.Item>

                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col style={{ display: 'flex', justifyContent: 'end' }}>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Hủy
                                        </Button>
                                        <BtnUpdate className='mx-1 bg-primary' htmlType='submit'>Cập nhật</BtnUpdate>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={e => {
                        handleClose();
                    }}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onFinish}>
                        Cập nhật
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default ModalUpdate;