// api.js
import { gql } from '@apollo/client';
import { client } from './apolloClient'; // Import your configured Apollo Client instance

// Define GraphQL queries and mutations
const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation SaveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`;

// API call functions using Apollo Client

// Function to get the current user's data
export const getMe = async () => {
  try {
    const { data } = await client.query({
      query: GET_ME,
      fetchPolicy: 'no-cache', // Adjust cache policy as needed
    });
    return data.me;
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw err;
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: userData,
    });
    return data.createUser;
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: userData,
    });
    return data.loginUser;
  } catch (err) {
    console.error('Error logging in user:', err);
    throw err;
  }
};

// Function to save a book
export const saveBook = async (bookData) => {
  try {
    const { data } = await client.mutate({
      mutation: SAVE_BOOK,
      variables: { bookData },
    });
    return data.saveBook;
  } catch (err) {
    console.error('Error saving book:', err);
    throw err;
  }
};

// Function to delete a book
export const deleteBook = async (bookId) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_BOOK,
      variables: { bookId },
    });
    return data.removeBook;
  } catch (err) {
    console.error('Error deleting book:', err);
    throw err;
  }
};

// Function to search Google Books (This remains unchanged as it's an external API call)
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
