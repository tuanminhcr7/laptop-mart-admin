import { DatePicker, Image, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import moment from 'moment';

const ModalUpdate = ({ show, handleClose, dataChoose }) => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const [statusShipping, setStatusShipping] = useState([
        { status: 1, name: "Đang xử lý" },
        { status: 2, name: "Chờ xác nhận" },
        { status: 3, name: "Đã xác nhận" },
        { status: 4, name: "Đang chuẩn bị" },
        { status: 5, name: "Đã đưa hàng cho Shipper" },
        { status: 6, name: "Đang giao hàng" },
        { status: 7, name: "Đã giao hàng" },
        { status: 8, name: "Đã hoàn thành" },
        { status: 9, name: "Đã hủy" },
        { status: 10, name: "Đang chờ đổi trả" },
        { status: 11, name: "Đã đổi trả" },
        { status: 12, name: "Đã hoàn tiền" }
    ])

    const getDetailShipping = async () => {
        Api.shippingShow(dataChoose?.order_id).then(res => {
            setData(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    };

    const [formData, setFormData] = useState({
        estimatedDeliveryDate: data?.estimated_delivery_date,
        actualDeliveryDate: data?.actual_delivery_date,
        fee: data?.fee,
        note: data?.note,
        shippingStatusId: data?.shipping_status?.status
    });

    console.log(formData);

    useEffect(() => {
        setFormData({
            estimatedDeliveryDate: data?.estimated_delivery_date,
            actualDeliveryDate: data?.actual_delivery_date,
            fee: data?.fee,
            note: data?.note,
            shippingStatusId: data?.shipping_status?.status
        })
    }, [data]);

    useEffect(() => {
        show && getDetailShipping();
        show !== true && setData(null);
    }, [show])

    const onChange = (name, value) => {
        const newDataChoose = _.clone(data);
        newDataChoose[name] = value;

        setFormData({
            ...formData,
            estimatedDeliveryDate: moment(newDataChoose?.estimatedDeliveryDate).format("YYYY-MM-DDTHH:mm:ss.000Z") || data?.estimated_delivery_date,
            actualDeliveryDate: moment(newDataChoose?.actualDeliveryDate).format("YYYY-MM-DDTHH:mm:ss.000Z") || data?.actual_delivery_date,
            fee: newDataChoose?.fee || data?.fee,
            note: newDataChoose?.note || data?.note,
            shippingStatusId: newDataChoose?.shippingStatusId || data?.shipping_status?.status
        });
    }

    const onFinish = () => {
        console.log(formData);
        const payload = { ...formData };
        Api.shippingUpdate(dataChoose?.order_id, payload).then(res => {
            handleClose();
            toast.success("Cập nhật thành công");
        }).catch(err => {

        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật shipping</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data &&
                        <>
                            <Row>
                                <Col>
                                    <label>Ngày vận chuyển (Ước lượng)</label>
                                    <DatePicker
                                        onChange={e => onChange("estimatedDeliveryDate", e)}
                                        defaultValue={moment(data?.estimated_delivery_date) || null}
                                        format={"DD/MM/YYYY"}
                                    />
                                    {/* <div>{moment(data?.date).format("DD/MM/YYYY HH:mm:ss")}</div> */}
                                </Col>
                                <Col>
                                    <label>Ngày vận chuyển (Thực tế)</label>
                                    <DatePicker
                                        onChange={e => onChange("actualDeliveryDate", e)}
                                        defaultValue={moment(data?.actual_delivery_date) || null}
                                        format={"DD/MM/YYYY"}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <label>Ghi chú</label>
                                    <Input defaultValue={data?.note} onChange={e => onChange("note", e.target.value)} />
                                </Col>
                                <Col>
                                    <label>Phí vận chuyển</label><br />
                                    <Input defaultValue={data?.fee} onChange={e => onChange("fee", e.target.value)} />
                                </Col>

                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <label>Trạng thái</label><br />
                                    <Select
                                        style={{ width: "100%" }}
                                        defaultValue={data?.shipping_status?.status}
                                        onChange={e => onChange("shippingStatusId", e)}
                                    >
                                        {statusShipping?.map(item => {
                                            return <Select.Option value={item?.status}>{item?.name}</Select.Option>
                                        })}
                                    </Select>

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