# Copilot Development Guidelines

As you assist in writing code, please prioritize the following:

1.  **Component Structure**: Prefer functional components. For shared components, place them in `src/components/shared`. Feature-specific components go into `src/components/features/*`.
2.  **Ant Design Usage**: Leverage Ant Design components wherever possible. Customize them using the theme files located in `src/styles`. Do not use inline styles for customizations that can be handled by the theme.
3.  **Hooks**: Custom hooks are located in `src/hooks`. Create new hooks for reusable logic.
4.  **API Services**: All API interactions should be handled through the services defined in `src/services` and feature-specific services in `src/features/*/`.
