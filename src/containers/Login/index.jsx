import { Input, Button, Form } from 'antd';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Apis from '../../Apis';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();

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

    const onFinish = (value) => {
        const payload = {
            account: value?.account,
            password: value?.password,
            isUser: false
        }
        Apis.login(payload).then(res => {
            toast.success("Đăng nhập thành công!");
            Cookies.set('token', res?.data?.data?.token);
            // Cookies.set('account', payload?.account)
            setTimeout(() => {
                navigate('/');
            }, 2000);

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
                        <Form
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <div className="login-box">
                                <div className="login-logo">
                                    <b>LOGIN</b>
                                </div>
                                {/* /.login-logo */}
                                <div className="card">
                                    <div className="card-body login-card-body">
                                        <label>Account</label>
                                        {/* <div className="input-group mb-3"> */}
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Tài khoản không được để trống',
                                                },
                                                {
                                                    min: 5,
                                                    message: 'Tài khoản phải có ít nhất 5 ký tự'
                                                }
                                            ]}
                                            name={"account"}
                                        >
                                            {/* <Input onChange={onChangeUsername} type="text" className="form-control" placeholder="Username" /> */}
                                            <Input placeholder="Account" />
                                        </Form.Item>
                                        {/* </div> */}

                                        <label>Password</label>
                                        <Form.Item
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Mật khẩu không được để trống',
                                                },
                                                {
                                                    min: 6,
                                                    message: 'Mật khẩu phải có ít nhất 6 ký tự'
                                                }
                                            ]}
                                            name={'password'}
                                        >
                                            <Input type='password' placeholder='Password' />
                                        </Form.Item>
                                        {/* <div className="input-group mb-3">
                                            <input onChange={onChangePassword} type="password" className="form-control" placeholder="Password" />

                                        </div> */}
                                        <div className="row">

                                            {/* /.col */}
                                            <div className="col-12">
                                                {/* <button onClick={onFinish} className="btn btn-primary btn-block">Login</button> */}
                                                <Button htmlType='submit' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="btn btn-primary btn-block">Login</Button>
                                            </div>
                                            {/* /.col */}
                                        </div>
                                    </div>
                                    {/* /.login-card-body */}
                                </div>
                            </div>
                        </Form>


                    </Col>
                    <Col></Col>
                </Row>

            </Container>
            <ToastContainer />

        </div>
    );
};

export default Login;