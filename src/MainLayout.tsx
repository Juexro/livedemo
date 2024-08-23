import React, { useState } from 'react';
import {
  CodepenOutlined,
  GithubOutlined,
  JavaScriptOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Space, theme } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const location = useLocation();

  return (
    <Layout id='app'>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <JavaScriptOutlined /> {!collapsed && 'Live Demo'}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/codemirror-iecst-editor',
              icon: <CodepenOutlined />,
              label: <Link to={"/codemirror-iecst-editor"}>codemirror-iecst</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto"
          }}
        >
          <Outlet />
        </Content>
        <Layout.Footer style={{ textAlign: 'center', paddingTop: '0' }}>
          <Space size={32}>
            <Space>
              <span>&copy; 2024 Juexro</span>
              <a href='https://github.com/Juexro' target='_blank' rel='noreferrer'><GithubOutlined /></a>
              <a href='mailto://juexro@163.com' rel='noreferrer'><MailOutlined /></a>
            </Space>
            <Space>
              <img src="/images/police.avif" alt="" style={{ width: '12px', height: '12px' }} />
              <a href="https://beian.miit.gov.cn/" target="_blank" rel='noreferrer'>苏ICP备17006194号-4</a>
            </Space>
          </Space>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;