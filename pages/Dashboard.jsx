import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Form, Input, InputNumber, Select, Popconfirm, Table, Row, Button, Col, message } from 'antd';
import Sidebar from '../components/Sidebar';
import axios from '../axios/api';

const { Option } = Select;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    let inputNode;
    if (inputType === 'number') {
        inputNode = <InputNumber />;
    } else if (inputType === 'select') {
        inputNode = (
            <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Staff">Staff</Option>
            </Select>
        );
    } else {
        inputNode = <Input />;
    }
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[{ required: true, message: `Please Input ${title}!` }]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Dashboard = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
                const response = await axios.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                message.error('Failed to fetch user data.');
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const isEditing = (record) => record.id === editingId;

    const edit = (record) => {
        form.setFieldsValue({
            name: record.name,
            username: record.username,
            phone_number: record.phone_number,
            role: record.role,
        });
        setEditingId(record.id);
    };

    const cancel = () => {
        setEditingId('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const token = localStorage.getItem('token');
            await axios.put(`/user/${id}`, row, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingId('');
            }
        } catch (errInfo) {
            message.error('Failed to save changes.');
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newData = data.filter((item) => item.id !== id);
            setData(newData);
        } catch (error) {
            message.error('Failed to delete user.');
            console.error('Error deleting user:', error);
        }
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'username',
            dataIndex: 'username',
            editable: true,
        },
        {
            title: 'contact',
            dataIndex: 'phone_number',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            editable: true,
            inputType: 'select',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button danger>Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Button type="primary" disabled={editingId !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRecord(record.id)}>
                            <Button type="primary" danger disabled={editingId !== ''} style={{ marginLeft: 8 }}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.inputType || 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleAddUser = () => {
        navigate('/register');
    };

    return (
        <>
            <Sidebar>
                <div style={{ padding: '20px' }}>
                    <Row span={24} style={{ maxWidth: '800px' }}>
                        <Title level={2} span={24} style={{ marginBottom: '30px' }}>User Management</Title>
                    </Row>
                    <Row span={24} style={{ display: 'flex', maxWidth: '800px', marginBottom: '20px' }}>
                        <Button type="primary" onClick={handleAddUser}>Add User</Button>
                    </Row>
                    <div>
                        <Form form={form} component={false}>
                            <Table
                                components={{
                                    body: { cell: EditableCell },
                                }}
                                bordered
                                dataSource={data.map(item => ({ ...item, key: item.id }))}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{ onChange: cancel }}
                            />
                        </Form>
                    </div>
                </div>
            </Sidebar>
        </>
    );
};

export default Dashboard;
