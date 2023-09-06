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
import BtnSubmit from '../../../components/BtnSubmit';

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
            entryDatetime: moment(newDataChoose?.entryDatetime).format("YYYY-MM-DD HH:mm:ss") || moment(newDataChoose?.entry_datetime).format("YYYY-MM-DD HH:mm:ss"),
            entryPrice: newDataChoose?.entryPrice || newDataChoose?.entry_price
        });
    }

    const onFinish = (value) => {
        const payload = {
            quantity: value?.quantity,
            entryDatetime: moment(value?.entryDatetime)?._i,
            entryPrice: value?.entryPrice
        };

        Api.stockEntriesUpdate(productId, dataChoose?.id, payload).then(res => {
            toast.success("Cập nhật thành công!");
            handleClose();
        }).catch(err => {

        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm kho của: {productName}</Modal.Title>
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
                                    <Col style={{ display: 'flex', justifyContent: "end" }}>
                                        <BtnSubmit onclick={handleClose} title={"Cập nhật"} />
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