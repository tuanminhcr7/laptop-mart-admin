import { Button, DatePicker, Form, Image, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import _ from 'lodash';
import TextArea from 'antd/es/input/TextArea';
import BtnUpload from 'antd/es/button';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import moment from 'moment';
import BtnSubmit from '../../../components/BtnSubmit';



const ModalUpdate = ({ show, handleClose, dataChoose }) => {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState(false)
    const date = new Date(data?.actual_delivery_date);

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
            estimatedDeliveryDate: moment(newDataChoose?.estimatedDeliveryDate).format("YYYY-MM-DD HH:mm:ss"),
            actualDeliveryDate: moment(newDataChoose?.actualDeliveryDate).format("YYYY-MM-DD HH:mm:ss"),
            fee: newDataChoose?.fee || data?.fee,
            note: newDataChoose?.note || data?.note,
            shippingStatusId: newDataChoose?.shippingStatusId || data?.shipping_status?.status
        });
    }

    useEffect(() => {
        event && setFormData(formData)
    }, [event]);

    const onFinish = (value) => {
        // console.log(value);
        const payload = {
            estimatedDeliveryDate: moment(value?.estimatedDeliveryDate)._i,
            actualDeliveryDate: moment(value?.actualDeliveryDate)?._i,
            fee: value?.fee,
            note: value?.note,
            shippingStatusId: value?.shippingStatusId
        };
        // console.log(payload);
        console.log(moment(value?.actualDeliveryDate)?._i);
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
                            <Form
                                initialValues={{
                                    estimatedDeliveryDate: data && moment(data?.estimated_delivery_date) || null,
                                    actualDeliveryDate: data && moment(data?.actual_delivery_date) || null,
                                    fee: data && data?.fee,
                                    note: data && data?.note,
                                    shippingStatusId: data && data?.shipping_status?.status
                                }}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col>
                                        <label>Ngày vận chuyển (Ước lượng)</label>
                                        <div>{moment(data?.estimated_delivery_date).format("DD/MM/YYYY")}</div>
                                        <Form.Item
                                            name="estimatedDeliveryDate"
                                        >
                                            <input type='datetime-local' />

                                        </Form.Item>

                                        {/* <div>{moment(data?.date).format("DD/MM/YYYY HH:mm:ss")}</div> */}
                                    </Col>
                                    <Col>
                                        <label>Ngày vận chuyển (Thực tế)</label>
                                        <div>{moment(data?.actual_delivery_date).format("DD/MM/YYYY")}</div>
                                        <Form.Item
                                            name="actualDeliveryDate"
                                        >
                                            <input type='datetime-local' />

                                            {/* <DatePicker
                                                key={1}
                                                // defaultValue={moment(data?.estimated_delivery_date)}
                                                placeholder='Ngày vận chuyển'
                                                format={"DD/MM/YYYY"}
                                            /> */}


                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col>
                                        <label>Ghi chú</label>
                                        <Form.Item
                                            name="note"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <label>Phí vận chuyển</label><br />
                                        <Form.Item
                                            name="fee"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row className='mt-3'>
                                    <Col>
                                        <label>Trạng thái</label><br />
                                        <Form.Item name={"shippingStatusId"}>
                                            <Select
                                                style={{ width: "100%" }}
                                            >
                                                {statusShipping?.map(item => {
                                                    return <Select.Option value={item?.status}>{item?.name}</Select.Option>
                                                })}
                                            </Select>
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
                {/* <Modal.Footer>
                    <Button className='bg-danger' onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className='bg-primary' htmlType='submit'>
                        Cập nhật
                    </Button>
                </Modal.Footer> */}

            </Modal>


        </div >
    );
};

export default ModalUpdate;