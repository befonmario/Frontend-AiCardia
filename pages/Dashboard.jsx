import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Form, Input, InputNumber, Select, Popconfirm, Table, Row, Button, Col } from 'antd';
import Sidebar from '../components/Sidebar';

const { Option } = Select;

const originData = [
    {
        id: '1',
        name: 'Edward 1',
        username: 'Edward 1',
        contact: 32,
        Role: 'Staff',
    },
    {
        id: '2',
        name: 'Edward 2',
        username: 'Edward 2',
        contact: 33,
        Role: 'Staff',
    },
    // Add other objects here as needed
];

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
    const [data, setData] = useState(originData);
    const [editingId, setEditingId] = useState('');
    const navigate = useNavigate();

    const isEditing = (record) => record.id === editingId;

    const edit = (record) => {
        form.setFieldsValue({
            name: record.name,
            username: record.username,
            contact: record.contact,
            Role: record.Role,
        });
        setEditingId(record.id);
    };

    const cancel = () => {
        setEditingId('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
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
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
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
            dataIndex: 'contact',
            editable: true,
        },
        {
            title: 'Role',
            dataIndex: 'Role',
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
