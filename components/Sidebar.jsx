import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  EditOutlined,
  UserAddOutlined,
  HomeOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, role, name, logout } = useAuth();

  useEffect(() => {
    const pathname = location.pathname;
    let selectedKey = '1';
    switch (pathname) {
      case '/':
        selectedKey = '1';
        break;
      case '/input-predict':
        selectedKey = '2';
        break;
      case '/output-predict':
        selectedKey = '3';
        break;
      case '/register':
        selectedKey = '4';
        break;
      case '/dashboard':
        selectedKey = '5';
        break;
      case '/login':
        selectedKey = '6';
        break;
      default:
        break;
    }
    setSelectedKeys([selectedKey]);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/input-predict');
        break;
      case '3':
        navigate('/output-predict');
        break;
      case '4':
        navigate('/register');
        break;
      case '5':
        navigate('/dashboard');
        break;
      case '6':
        navigate('/login');
        break;
      case '7':
        logout();
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Home' },
    { key: '2', icon: <EditOutlined />, label: 'Input Predict' },
    { key: '3', icon: <UploadOutlined />, label: 'Output Predict' },
  ];

  if (isAuthenticated) {
    if (role === 'admin') {
      menuItems.push(
        { key: '4', icon: <UserAddOutlined />, label: 'Add user' },
        { key: '5', icon: <UsergroupAddOutlined />, label: 'Dashboard admin' }
      );
    }
    menuItems.push(
      { key: '7', icon: <LogoutOutlined />, label: 'Logout' }
    );
  } else {
    menuItems.push({ key: '6', icon: <LoginOutlined />, label: 'Change account' });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          {isAuthenticated && (
            <div style={{ marginRight: 16 }}>
              Name: {name}, Role: {role}
            </div>
          )}
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#ECECEC' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
