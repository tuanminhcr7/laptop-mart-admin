import { DatePicker, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Button as BtnUpdate } from 'antd';
import BtnSubmit from '../../../components/BtnSubmit';

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [dataStockEntryShow, setDataStockEntryShow] = useState(null);

    const getDataStockEntryShow = async () => {
        Api.stockEntriesShow(dataChoose?.product_id, dataChoose?.id).then(res => {
            setDataStockEntryShow(res?.data?.data);
        }).catch(err => {

        });
    }

    const onFinish = (value) => {
        const payload = {
            quantity: value?.quantity,
            entryDatetime: moment(value?.entryDatetime)?._i,
            entryPrice: value?.entryPrice
        };
        // console.log(payload);
        Api.stockEntriesUpdate(dataChoose?.product_id, dataChoose?.id, payload).then(res => {
            handleClose();
            toast.success("Cập nhật thành công!");
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    useEffect(() => {
        show && getDataStockEntryShow();
        show !== true && setDataStockEntryShow(false);
    }, [show]);
    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm kho: {dataChoose?.product?.name}</Modal.Title>
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
                                            <Input />
                                        </Form.Item>

                                    </Col>
                                    <Col>
                                        <label>Ngày nhập kho</label>
                                        <div>{moment(dataStockEntryShow?.entry_datetime).format("DD/MM/YYYY")}</div>
                                        <Form.Item
                                            name={"entryDatetime"}
                                        >
                                            <input type='datetime-local' />
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
                                        <BtnSubmit title={"Cập nhật"} onclick={handleClose} />
                                    </Col>
                                </Row>
                            </Form>

                        </>
                    }
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default ModalUpdate;