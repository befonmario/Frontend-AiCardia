import React from 'react';
import Title from 'antd/es/typography/Title';
import { Row, Button, Form, Input, Select, Space, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import Sidebar from '../components/Sidebar';

const Register = () => {
  const navigate = useNavigate();

  const handleBackDashboard = () => {
    navigate('/dashboard');
  };

  const onFinish = async (values) => {
    try {
      const response = await api.post('/auth/register', {
        name: values.name,
        username: values.username,
        password: values.password,
        phone_number: values.contact,
        role: values.select,
      });
      message.success('User created successfully');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.message);
      } else {
        message.error('An error occurred while creating the user');
      }
    }
  };

  return (
    <>
      <Sidebar>
        <div style={{ padding: '20px' }}>
          <Row span={24} style={{ maxWidth: '800px' }}>
            <Title level={2} span={24} style={{ marginBottom: '30px' }}>User Management</Title>
          </Row>
          <Card>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout='horizontal'
              style={{ maxWidth: 600 }}
              labelAlign="left"
              onFinish={onFinish}
            >
              <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Contact' name='contact' rules={[{ required: true, message: 'Please input your contact number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Input.Password />
                </Space>
              </Form.Item>
              <Form.Item label='Select' name='select' rules={[{ required: true, message: 'Please select a role!' }]}>
                <Select>
                  <Select.Option value='Staff'>Staff</Select.Option>
                  <Select.Option value='Admin'>Admin</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>OK</Button>
                <Button type='default' onClick={handleBackDashboard}>Back</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Sidebar>
    </>
  );
};

export default Register;
