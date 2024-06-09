import React from 'react';
import Title from 'antd/es/typography/Title';
import { Row, Button, Form, Input, Select, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Register = () => {
  const navigate = useNavigate();
  const handleBackDashboard = () => {
    navigate('/dashboard');
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
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout='horizontal'
            style={{
              maxWidth: 600,
            }}
            labelAlign="left"
          >
            <Form.Item label='Name' name='input1' >
              <Input />
            </Form.Item>
            <Form.Item label='Username' name='input2'>
              <Input />
            </Form.Item>
            <Form.Item label='Contact' name='input3'>
              <Input />
            </Form.Item>
            <Form.Item label='Password' name='input4'>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input.Password />
              </Space>
            </Form.Item>
            <Form.Item label='Select' name='select'>
              <Select>
                <Select.Option value='option1'>Staff</Select.Option>
                <Select.Option value='option2'>Admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button type='primary' style={{ marginRight: '20px' }}>OK</Button>
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
