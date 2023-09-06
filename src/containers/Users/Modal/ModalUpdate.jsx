import { Form, Input, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import Api from '../../../Apis';
import { toast } from 'react-toastify';
import BtnSubmit from '../../../components/BtnSubmit';

const ModalUpdate = ({ show, handleClose, dataChoose, onRefresh }) => {

    const [dataUser, setDataUser] = useState(null);

    const getDataUser = async () => {
        Api.userDetail(dataChoose?.id).then(res => {
            setDataUser(res?.data?.data);
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        })
    }

    useEffect(() => {
        show && getDataUser();
        show !== true && setDataUser(null);
    }, [show])

    const onFinish = (value) => {
        // console.log(formData);
        const payload = {
            firstName: value?.firstName,
            lastName: value?.lastName,
            email: value?.email,
            phone: value?.phone,
            status: value?.status ? 1 : 0
        }
        Api.userUpdate(dataChoose?.id, payload).then(res => {
            onRefresh();
            handleClose();
            toast.success("Cập nhật thành công!");
        }).catch(err => {
            toast.error(err?.response?.data?.error.description);
        });
    }
    return (
        <div>

            <Modal backdrop={'static'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataUser &&
                        <Form
                            onFinish={onFinish}
                            initialValues={{
                                firstName: dataUser && dataUser?.first_name,
                                lastName: dataUser && dataUser?.last_name,
                                email: dataUser && dataUser?.email,
                                phone: dataUser && dataUser?.phone,
                                status: dataUser && dataUser?.status
                            }}
                        >
                            <Row>
                                <Col>
                                    <label>First Name</label>
                                    <Form.Item
                                        name={"firstName"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "First Name không được để trống!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <label>Last Name</label>
                                    <Form.Item
                                        name={"lastName"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Last Name không được để trống",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <label>Email</label>
                                    <Form.Item
                                        name={"email"}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <label>Phone</label>
                                    <Form.Item
                                        name={"phone"}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <label>Trạng thái</label>
                                    <Form.Item
                                        name={"status"}
                                    >
                                        <Switch className='mx-3 mt-3'
                                            defaultChecked={dataUser?.status == 1 ? true : false}
                                            size='small'
                                        />
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ display: 'flex', justifyContent: "end" }}>
                                    <BtnSubmit onclick={handleClose} title={"Cập nhật"} />
                                </Col>

                            </Row>
                        </Form>
                    }


                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalUpdate;