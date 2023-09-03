import { DatePicker, Input, InputNumber, Select, Upload, message } from 'antd';
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

const ModalUpdate = ({ show, handleClose, dataChoose }) => {

    const [dataStockEntryShow, setDataStockEntryShow] = useState(null);


    const getDataStockEntryShow = async () => {
        Api.stockEntriesShow(dataChoose?.product_id, dataChoose?.id).then(res => {
            setDataStockEntryShow(res?.data?.data);
        }).catch(err => {

        });
    }

    const [formData, setFormData] = useState({
        quantity: dataStockEntryShow?.quantity,
        entryDatetime: moment(dataStockEntryShow?.entry_datetime).format("YYYY-MM-DD HH:mm:ss"),
        entryPrice: dataStockEntryShow?.entry_price
    })

    const onChange = (name, value) => {
        const newDataChoose = _.clone(dataChoose);
        newDataChoose[name] = value;
        setFormData(newDataChoose);
    }

    const onFinish = () => {
        console.log(formData);
        const payload = { ...formData };
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
                            <Row>
                                <Col>
                                    <label>Số lượng</label>
                                    <Input
                                        defaultValue={dataStockEntryShow?.quantity}
                                        onChange={e => onChange('quantity', e.target.value)}
                                    />
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
                        </>
                    }
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