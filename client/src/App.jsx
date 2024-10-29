import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Import Apollo Client components

// Create Apollo Client instance
const client = new ApolloClient({
  uri: '/graphql', // Ensure this matches your server endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
