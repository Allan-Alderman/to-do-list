/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getToDoItem = /* GraphQL */ `
  query GetToDoItem($id: ID!) {
    getToDoItem(id: $id) {
      id
      name
      description
      username
      duedate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listToDoItems = /* GraphQL */ `
  query ListToDoItems(
    $filter: ModelToDoItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listToDoItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        username
        duedate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
