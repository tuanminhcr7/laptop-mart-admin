import { DatePicker, Input, InputNumber, Select, Upload, message } from 'antd';
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

const ModalUpdate = ({ show, handleClose, dataChoose, productId }) => {


    const [dataStockEntryShow, setDataStockEntryShow] = useState({
        "id": 1,
        "product_id": 6,
        "quantity": 10,
        "entry_datetime": "2023-08-15T12:22:22.000Z",
        "entry_price": 800,
        "created_at": "2023-08-15T06:22:02.000Z",
        "updated_at": "2023-08-15T07:21:34.000Z",
        "deleted_at": null
    });
    const [formData, setFormData] = useState({
        quantity: dataStockEntryShow?.quantity,
        entryDatetime: moment(dataStockEntryShow?.entry_datetime).format("YYYY-MM-DD HH:mm:ss"),
        entryPrice: dataStockEntryShow?.entry_price
    })

    const getDataStockEntryShow = async () => {
        Api.stockEntriesShow(productId, dataChoose?.id).then(res => {
            setDataStockEntryShow(res?.data?.data);
        }).catch(err => {

        });
    }

    useEffect(() => {
        show && getDataStockEntryShow();
    })

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataStockEntryShow);
        newDataChoose[name] = value;
        setFormData({
            quantity: newDataChoose?.quantity || newDataChoose?.quantity,
            entryDatetime: moment(newDataChoose?.entryDatetime).format("YYYY-MM-DD HH:mm:ss") || moment(newDataChoose?.entry_datetime).format("YYYY-MM-DD HH:mm:ss"),
            entryPrice: newDataChoose?.entryPrice || newDataChoose?.entry_price
        });
    }

    const onFinish = () => {
        console.log(formData);
        const payload = { ...formData };

        Api.stockEntriesUpdate(productId, dataChoose?.id, payload).then(res => {
            toast.success("Cập nhật thành công!");
            handleClose();
        }).catch(err => {

        });
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật sản phẩm kho</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Số lượng</label>
                            <Input
                                defaultValue={dataStockEntryShow?.quantity}
                                onChange={e => onChange('quantity', e.target.value)} />
                        </Col>
                        <Col>
                            <label>Ngày nhập kho</label>
                            <DatePicker
                                defaultValue={moment(dataStockEntryShow?.entry_datetime)}
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={e => onChange('entryDatetime', moment(e).format('YYYY-MM-DD HH:mm:ss'))}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Giá nhập kho</label>
                            <InputNumber
                                defaultValue={dataStockEntryShow?.entry_price}
                                addonAfter="$"
                                onChange={e => onChange('entryPrice', e)}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={onFinish}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default ModalUpdate;