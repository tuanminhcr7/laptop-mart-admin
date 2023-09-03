import { Image, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import { Link } from 'react-router-dom';

const ModalDetail = ({ show, handleClose, dataChoose }) => {

    const [dataProductShow, setDataProductShow] = useState(null);

    const getProductShow = async () => {
        Api.productShow(dataChoose?.id).then(res => {
            setDataProductShow(res?.data?.data);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    };

    useEffect(() => {
        show && getProductShow();
        show !== true && setDataProductShow(null);
    }, [show]);

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>Tên sản phẩm</label>
                            {/* <Input defaultValue={dataChoose?.name} onChange={e => onChange('name', e.target.value)} /> */}
                            <div>{dataProductShow?.name}</div>
                        </Col>
                        <Col>
                            <label>Mô tả</label>
                            <div>{dataProductShow?.description}</div>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Cân nặng</label>
                            <div>{dataProductShow?.weight} Kg</div>
                        </Col>
                        <Col>
                            <label>Màu sắc</label><br />
                            <div>{dataProductShow?.color?.name}</div>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <label>Độ phân giải</label><br />
                            <div>{dataProductShow?.resolution?.name}</div>

                        </Col>
                        <Col>
                            <label>Giá</label>
                            <div>{dataProductShow?.price}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <label className=''>Hình ảnh</label><br></br>
                            <Image
                                preview={false}
                                width={100}
                                src={dataProductShow?.images[0]?.url}
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col className='mt-2' style={{ display: 'flex', justifyContent: 'end' }}>
                            {/* <Button variant='success' onClick={e => handleShowModalVariant(dataChoose)}>Biến thể</Button> */}
                            <Button className='mx-1' variant='warning'>
                                <Link style={{ color: '#fff' }} to={`/products/${dataChoose?.id}/stock-entries`}>Kho</Link>
                            </Button>
                            <Button variant='success'>
                                <Link style={{ color: '#fff' }} to={`/products/${dataChoose?.id}/variants`}>Biến thể</Link>
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