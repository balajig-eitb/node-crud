import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HR Portal API DOCS',
      version: '1.0.0',
      description: 'API documentation for Roles service',
    },
    tags: [
      {
        name: "Users",
        description: "User management APIs",
      },
      {
        name: "Candidates",
        description: "Candidate-related APIs",
      },
      {
        name: "Roles",
        description: "Candidate-related APIs",
      },
    ],
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // where your routes live
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
