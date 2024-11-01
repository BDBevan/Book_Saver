const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema'); // Your GraphQL schema
const { authMiddleware } = require('./utils/auth'); // Import the modified authMiddleware

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Apollo Server with typeDefs, resolvers, and authentication middleware in the context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }) // Pass the request object to the authMiddleware
});

// Apply Apollo middleware to the Express app
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Use the existing routes for any remaining RESTful endpoints (if needed)
app.use(routes);


// Start the database connection and server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
