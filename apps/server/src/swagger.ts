import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vi-Kanban API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.routes.ts'],
});
