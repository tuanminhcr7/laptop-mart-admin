import { Image, Input, InputNumber, Select, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import { Link } from 'react-router-dom';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataOrderDetail, setDataOrderDetail] = useState(null);
    const [listProduct, setListProduct] = useState([]);

    const getDataOrderDetail = async () => {
        Api.orderShow(dataChoose?.id).then(res => {
            setDataOrderDetail(res?.data?.data);
        }).catch(err => {

        });
    }

    const getListProduct = async () => {
        Api.productList().then(res => {
            setListProduct(res?.data?.data);
        }).catch(err => {

        })
    }



    const cartProducts = listProduct.length === 0 ? [] : dataOrderDetail?.order_items?.map((item) => {
        const product = listProduct?.find(
            (product) => product.id === item.product_id
        )

        return {
            id: product?.id || 0,
            name: product?.name || '',
            price: item.price,
            inventory: product?.inventory || 0,
            image: product?.images[0].url || '',
            quantity: item.quantity
        }
    });


    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            width: 10,
            render: (text, record, index) => {
                return index + 1;
            }
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            width: 100
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            width: 100,
            render: (text, record) => {
                return <Image
                    src={text}
                    width={50}
                    preview={false}
                />
            }
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            width: 100
        },
        {
            title: "Giá",
            dataIndex: "price",
            width: 100
        },
    ]

    useEffect(() => {
        show && getDataOrderDetail();
        show && getListProduct();
        show !== true && setDataOrderDetail(null);
    }, [show]);

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Người nhận</label>
                            <div>{dataOrderDetail?.recipient_name}</div>
                        </Col>
                        <Col>
                            <label>Số điện thoại</label>
                            <div>{dataOrderDetail?.recipient_phone}</div>

                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Địa chỉ</label>
                            <div>{dataOrderDetail?.shipping_address}</div>
                        </Col>
                        <Col>
                            <label>Số tiền</label><br />
                            <div>{dataOrderDetail?.total_amount}</div>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Sản phẩm: </label>
                            <Table
                                bordered
                                columns={columns}
                                dataSource={cartProducts}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: "end" }}>
                            <Button variant='success'>
                                <Link className='text-white' to={`/products/shipping/${dataOrderDetail?.id}`}>Shipping</Link>
                            </Button>
                        </Col>
                    </Row>
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