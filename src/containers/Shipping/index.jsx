import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Api from '../../Apis';
import { Link, useParams } from 'react-router-dom';
import ModalUpdate from './Modal/ModalUpdate.jsx';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const Shipping = () => {

    const param = useParams();
    const orderId = param?.orderId;
    const [params, setParams] = useState({
        page: null,
        pageSize: null
    });

    const [dataShippingShow, setDataShippingShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        weight: null,
        description: null,
        colorId: null,
        displayId: null,
        graphicsCardId: null,
        manufacturerId: null,
        operatingSystemId: null,
        processorId: null,
        ramId: null,
        refreshRateId: null,
        resolutionId: null,
        storageId: null,
        images: null,
    });
    const [dataChoose, setDataChoose] = useState(null);

    const handleShowModalUpdate = (value) => {
        setShowModalUpdate(true);
        setDataChoose(value)
    }
    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setDataChoose(null)
        onRefresh();
    };

    const getDetailShipping = useCallback(async () => {
        setLoading(true);
        Api.shippingShow(orderId).then(res => {
            setDataShippingShow(res?.data?.data);
        }).catch(err => {
            if (err?.response?.data?.code == 404) {
                toast.error("Không tìm thấy đơn hàng");
            }
        });
    }, []);

    const getProfileUser = async () => {
        Api.userDetail(dataShippingShow?.user_id).then(res => {

        }).catch(err => {

        });
    }

    useEffect(() => {
        getDetailShipping();
    }, []);

    // useEffect(() => {
    //     dataShippingShow !== null && getProfileUser();
    // }, [dataShippingShow]);

    const onRefresh = () => {
        getDetailShipping();
    }

    console.log(dataShippingShow);

    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col><h3>Shipping</h3></Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}>
                            {/* <Button variant='success' onClick={handleShowModalCreate}>Thêm mới</Button> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}></Col>
                        <Col>
                            {dataShippingShow ?
                                <>
                                    <Row>
                                        <Col>
                                            <label>Ngày đặt</label>
                                            <div>{moment(dataShippingShow?.date).format("DD/MM/YYYY HH:mm:ss")}</div>
                                        </Col>
                                        <Col>
                                            <label>Địa chỉ</label>
                                            <div>{dataShippingShow?.address}</div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Ngày giao (Dự tính)</label>
                                            <div>{moment(dataShippingShow?.estimated_delivery_date).format("DD/MM/YYYY HH:mm:ss")}</div>
                                        </Col>
                                        <Col>
                                            <label>Ngày giao (Thực tế)</label>
                                            <div>{moment(dataShippingShow?.actual_delivery_date).format("DD/MM/YYYY HH:mm:ss")}</div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col>
                                            <label>Ghi chú</label>
                                            <div>{dataShippingShow?.note}</div>
                                        </Col>
                                        <Col>
                                            <label>Phí vận chuyển</label><br />
                                            {dataShippingShow?.is_free_shipping ? <div>Free ship</div> : <div>{dataShippingShow?.fee}</div>}
                                        </Col>

                                    </Row>
                                    <Row className='mt-3'>
                                        <Col>
                                            <label>Đối tác vận chuyển</label><br />
                                            <div>{dataShippingShow?.shipping_partner?.name} ({dataShippingShow?.shipping_partner?.description})</div>

                                        </Col>
                                        <Col>
                                            <label>Trạng thái vận chuyển</label>
                                            <div>{dataShippingShow?.shipping_status?.name} ({dataShippingShow?.shipping_status?.description})</div>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col>
                                            <Button variant='success' onClick={e => {
                                                handleShowModalUpdate(dataShippingShow);
                                            }}>Cập nhật</Button>
                                        </Col>
                                    </Row>
                                </> :
                                <div>Đơn hàng chưa thanh toán</div>
                            }

                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <ModalUpdate show={showModalUpdate} handleClose={handleCloseModalUpdate} dataChoose={dataChoose} />
                </Col>
            </Row>
            <ToastContainer />
        </div>

    );
};

export default Shipping;