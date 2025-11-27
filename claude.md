# Claude Development Guidelines

When assisting with this project, please adhere to the following:

1.  **Primary Frameworks**: This project uses React with Vite and Ant Design for the UI. All component and logic should align with this stack.
2.  **Styling**: We use a combination of Ant Design's theming capabilities (v4 and v5) and global CSS variables. Refer to the `src/styles/` directory for theme definitions.
    *   `ant-theme.js`: AntD v5 tokens.
    *   `ant-theme.less`: AntD v4 variables.
    *   `global.css`: Global CSS variables and utility classes.
3.  **State Management**: For global state, we use React Context API (`src/contexts`). For local state, use React hooks (`useState`, `useReducer`).
4.  **Code Style**: Follow the rules defined in `.eslintrc.json` and `.prettierrc`. Use functional components with hooks.
