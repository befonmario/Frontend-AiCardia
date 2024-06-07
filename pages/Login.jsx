import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import logo from '../src/assets/AiCardia_logo.png';


const Login = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await api.post('/auth/login', {
                username: values.username,
                password: values.password
            })
            console.log(response)
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: error,
                icon: "error",
                timer: 2000,
                timerProgressBar: true
            });
            console.log(error)
        }
    };
    return (
        <div className='background-login'>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={20} style={{ maxWidth: '800px' }}>
                    <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
                        <Row gutter={16} align="middle">
                            <Col span={24}>
                                <Title level={1} style={{ textAlign: 'center' , marginTop: '0px'}}>AiCardia</Title>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        style={{ width: '50%', maxHeight: '300px', objectFit: 'contain' }}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <Title level={3}>Login</Title>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Username!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            size="large"
                                            placeholder="Username"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Password!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            size="large"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: 2 }} block>
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Login;