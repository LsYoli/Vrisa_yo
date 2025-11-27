# Codex Development Guidelines

When generating code for this project, please follow these instructions:

1.  **Technology Stack**: The project is built with React, Vite, and Ant Design. Ensure all generated code is compatible with this stack.
2.  **Styling Implementation**:
    *   For Ant Design components, use the theming system. Tokens are in `src/styles/ant-theme.js` (v5) and variables in `src/styles/ant-theme.less` (v4).
    *   For custom components, use the CSS variables defined in `src/styles/global.css`.
    *   Utility classes like `.card--glass` are available.
3.  **File Organization**:
    *   Pages go in `src/pages`.
    *   Reusable UI components are in `src/components/shared`.
    *   Feature-specific logic and components are in `src/features/*`.
4.  **Code Quality**: Adhere to the existing ESLint and Prettier configurations. Ensure code is readable and maintainable.
