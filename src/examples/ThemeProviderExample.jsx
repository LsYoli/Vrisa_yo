// src/examples/ThemeProviderExample.jsx

import React from 'react';
import { ConfigProvider, Layout, Card, Badge, Space, Typography } from 'antd';
import { theme } from '../styles/ant-theme';
import '../styles/global.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

/**
 * This example demonstrates how to apply the custom Ant Design theme and global styles.
 *
 * How to use this example:
 * 1. Place this component in your application.
 * 2. Ensure you have Ant Design installed (`npm install antd`).
 * 3. Make sure the paths to `ant-theme.js` and `global.css` are correct.
 *
 * For AntD v4 with Less (using craco):
 * Your `craco.config.js` should look something like this:
 *
 * const CracoLessPlugin = require('craco-less');
 *
 * module.exports = {
 *   plugins: [
 *     {
 *       plugin: CracoLessPlugin,
 *       options: {
 *         lessLoaderOptions: {
 *           lessOptions: {
 *             modifyVars: require('./src/styles/ant-theme.less'), // Or manually list vars
 *             javascriptEnabled: true,
 *           },
 *         },
 *       },
 *     },
 *   ],
 * };
 *
 * In a v4 setup, you would wrap your app in a standard Layout, and the theme
 * would be applied globally via the build process. The `ConfigProvider` for v5
 * makes this more explicit at the component level.
 */
const ThemeProviderExample = () => {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Header
          className="app-header--glass"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '0 24px',
            margin: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '16px',
          }}
        >
          <Title level={3} style={{ color: 'var(--color-text)', margin: 0 }}>
            Monitoring Dashboard
          </Title>
          <Badge className="badge--ok" status="processing" text="System Normal" />
        </Header>
        <Content style={{ padding: '0 16px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Space direction="horizontal" size="large" wrap>
              <Card title="Metric 1: PM2.5" style={{ width: 300 }} className="card--glass">
                <div className="metric">
                  <span className="metric__value">12.5</span>
                  <span className="metric__label">µg/m³</span>
                </div>
              </Card>
              <Card title="Metric 2: CO" style={{ width: 300 }}>
                <div className="metric">
                  <span className="metric__value">0.8</span>
                  <span className="metric__label">ppm</span>
                </div>
              </Card>
              <Card title="Metric 3: Temp" style={{ width: 300 }}>
                <div className="metric">
                  <span className="metric__value">24.1</span>
                  <span className="metric__label">°C</span>
                </div>
              </Card>
            </Space>

            <div className="map-wrapper">
              <Text>Map Wrapper (e.g., for Leaflet or Google Maps)</Text>
            </div>
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ThemeProviderExample;
