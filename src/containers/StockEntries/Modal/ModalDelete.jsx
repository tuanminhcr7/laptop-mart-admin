import { Input } from 'antd';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Api from '../../../Apis';
import { toast } from 'react-toastify';

const ModalDelete = ({ show, handleClose, dataChoose }) => {

    const onFinish = () => {
        Api.stockEntriesDelete(dataChoose?.product_id, dataChoose?.id).then(res => {
            toast.success("Xóa thành công!");
            handleClose();
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }

    return (
        <div>
            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm kho: {dataChoose?.product?.name}</Modal.Title>
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
        </div>
    );
};

export default ModalDelete;