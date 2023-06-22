import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String) {
  createUser(username: $username, email: $email, password: $password) {
    _id
    email
    password
  }
}
`;

export const CREATE_LOGIN = gql`
  mutation login($username: String!, $email: String!, $password: String) {
  login(username: $username, email: $email, password: $password) {
    _id
    email
    username
  }
}
`;

export const CREATE_SAVEBOOK = gql`
  mutation saveBooks($description: String!, $bookId: String!, $title: String!, $authors: String, $image: String, $link: String) {
  saveBook(description: $description, bookId: $bookId, title: $title, authors: $authors, image: $image, link: $link) {
    _id
    username
    email
    password
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`
export const CREATE_DELETEBOOK = gql`
  mutation deleteBook($description: String!, $bookId: String!, $title: String!, $authors: String) {
  deleteBook(description: $description, bookId: $bookId, title: $title, authors: $authors) {
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`