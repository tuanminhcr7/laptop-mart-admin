import { Input } from 'antd';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalDelete = ({ productId, show, handleClose, dataChoose, productName }) => {

    const onFinish = () => {
        Api.productVariantsDelete(productId, dataChoose?.id).then(res => {
            toast.success("Xóa thành công!");
            handleClose();
        }).catch(err => {
            toast.error(err?.message)
        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa biến thể sản phẩm: {productName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <p>Bạn có chắc muốn xóa sản phẩm này?</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button variant="danger" onClick={onFinish}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ModalDelete;