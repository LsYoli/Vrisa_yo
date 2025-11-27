import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  GlobalOutlined,
  AlertOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/app">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <Link to="/app/stations">Stations</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<GlobalOutlined />}>
          <Link to="/app/map">Map</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AlertOutlined />}>
          <Link to="/app/alerts">Alerts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
