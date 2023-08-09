/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createToDoItem = /* GraphQL */ `
  mutation CreateToDoItem(
    $input: CreateToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    createToDoItem(input: $input, condition: $condition) {
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
export const updateToDoItem = /* GraphQL */ `
  mutation UpdateToDoItem(
    $input: UpdateToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    updateToDoItem(input: $input, condition: $condition) {
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
export const deleteToDoItem = /* GraphQL */ `
  mutation DeleteToDoItem(
    $input: DeleteToDoItemInput!
    $condition: ModelToDoItemConditionInput
  ) {
    deleteToDoItem(input: $input, condition: $condition) {
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
