// src/styles/ant-theme.js

/**
 * Ant Design v5 Theme Token Object
 *
 * This object contains theme tokens for Ant Design v5's ConfigProvider.
 * It defines the color palette, typography, spacing, and component-specific styles.
 *
 * How to use:
 * 1. Import `applyThemeToConfigProvider` in your main App component.
 * 2. Wrap your application with AntD's `ConfigProvider`.
 * 3. Pass the theme object to the `theme` prop of `ConfigProvider`.
 *
 * Example:
 *
 * import { ConfigProvider } from 'antd';
 * import { theme } from './styles/ant-theme';
 *
 * const App = () => (
 *   <ConfigProvider theme={theme}>
 *     <YourApp />
 *   </ConfigProvider>
 * );
 */

export const theme = {
  token: {
    // Seed Tokens
    colorPrimary: '#3DD5C9',
    colorSuccess: '#43C87B',
    colorWarning: '#F5A623',
    colorError: '#E85151',
    colorInfo: '#3DD5C9',
    colorTextBase: '#252A2E',
    colorBgBase: '#F5F9F8',
    fontFamily: 'Inter var, Inter, "Segoe UI", Roboto, system-ui, -apple-system, sans-serif',
    fontSize: 16,
    borderRadius: 12,
    wireframe: false,
  },
  components: {
    Card: {
      borderRadiusLG: 16,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
      boxShadowSecondary: '0 6px 24px rgba(0, 0, 0, 0.08)',
    },
    Badge: {
      statusSize: 10,
    },
    Tooltip: {
      colorBgSpotlight: 'rgba(10, 61, 59, 0.85)',
      colorTextLightSolid: '#E6F7F5',
    },
    Modal: {
      colorBgSpotlight: 'rgba(10, 61, 59, 0.85)',
    },
  },
};

/**
 * Function to apply the theme to AntD's ConfigProvider.
 * This is a helper to illustrate how to use the theme object.
 *
 * @param {React.ReactNode} children - The child components to be wrapped.
 * @returns {React.ReactElement} - The ConfigProvider with the theme applied.
 */
export const ThemedConfigProvider = ({ children }) => {
  const { ConfigProvider } = require('antd');
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};
