# Gemini Project Guidelines

This document outlines the basic structure and rules for AI-assisted development in this project.

## Project Structure

```
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── shared/
│   │   └── features/
│   ├── contexts/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   │   ├── ant-theme.js
│   │   ├── ant-theme.less
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
└── vite.config.js
```

## Basic Rules

1.  **Follow Existing Conventions**: Analyze the existing code, file structure, and naming conventions before making changes.
2.  **Verify Dependencies**: Do not add new libraries without checking `package.json` first.
3.  **Mimic Style**: Match the existing coding style, including formatting, typing, and architectural patterns.
4.  **Add Comments Sparingly**: Focus on *why*, not *what*.
5.  **Verify Changes**: After making changes, run linting and testing commands if they are configured.
