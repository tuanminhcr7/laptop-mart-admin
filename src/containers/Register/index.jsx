import { Input, Button, Form } from 'antd';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Register = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
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
                        <h1 style={{ textAlign: 'center' }}>Register</h1>
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
                                label="First Name"
                                name="firstname"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastname"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your password!',
                            //     },
                            // ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your username!',
                            //     },
                            // ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="phone"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your password!',
                            //     },
                            // ]}
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
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>

        </div>
    );
};

export default Register;