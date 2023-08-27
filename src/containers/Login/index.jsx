import { Input, Button, Form } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Api from '../../Apis';
import { redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [formData, setFormData] = useState({
        username: null,
        password: null
    });

    const onChangeUsername = (e) => {
        setFormData({ ...formData, username: e.target.value });
    };

    const onChangePassword = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const onFinish = () => {
        console.log(formData);
        const payload = {
            account: formData?.username,
            password: formData?.password
        }
        Api.login(payload).then(res => {
            toast.success("Đăng nhập thành công!");
            setTimeout(() => {
                redirect("/");
            }, 3000);

        }).catch(err => {
            toast.error("Đăng nhập thất bại!");
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col style={{ marginTop: '10%' }}>
                        {/* <h1 style={{ textAlign: 'center' }}>LOGIN</h1>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                // maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form> */}
                        <div className="login-box">
                            <div className="login-logo">
                                <b>LOGIN</b>
                            </div>
                            {/* /.login-logo */}
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <label>Username</label>
                                    <div className="input-group mb-3">
                                        <input onChange={onChangeUsername} type="text" className="form-control" placeholder="Username" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                {/* <span className="fas fa-envelope" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <label>Password</label>
                                    <div className="input-group mb-3">
                                        <input onChange={onChangePassword} type="password" className="form-control" placeholder="Password" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                {/* <span className="fas fa-lock" /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">

                                        {/* /.col */}
                                        <div className="col-12">
                                            <button onClick={onFinish} className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                </div>
                                {/* /.login-card-body */}
                            </div>
                        </div>

                    </Col>
                    <Col></Col>
                </Row>

            </Container>
            <ToastContainer />

        </div>
    );
};

export default Login;