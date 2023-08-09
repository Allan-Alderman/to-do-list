import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {  
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listToDoItems } from "./graphql/queries";
import {
  createToDoItem as createToDoItemMutation,
  deleteToDoItem as deleteToDoItemMutation,
} from "./graphql/mutations";
import { Auth } from 'aws-amplify';

var username = null; 

const App = ({ signOut }) => {

  const [toDoItems, setToDoItems] = useState([]);
  
  useEffect(() => {
    fetchToDoItems();
  }, []);

  async function fetchToDoItems() {               
    username = username || (await Auth.currentAuthenticatedUser()).username;    
    const apiData = await API.graphql({ query: listToDoItems });    
    const toDoItemsFromAPI = apiData.data.listToDoItems.items.filter((toDoItem) => toDoItem.username === username);
    setToDoItems(toDoItemsFromAPI);
  }

  async function createToDoItem(event) {    
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      duedate: form.get("duedate"),
      username: username 
    };
    await API.graphql({
      query: createToDoItemMutation,
      variables: { input: data },
    });
    fetchToDoItems();
    event.target.reset();
  }

  async function deleteToDoItem({ id }) {
    const newToDoItems = toDoItems.filter((toDoItem) => toDoItem.id !== id);
    setToDoItems(newToDoItems);
    await API.graphql({
      query: deleteToDoItemMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>To-Do Items for {username}</Heading>
      <View as="form" margin="3rem 0" onSubmit={createToDoItem}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Item Name"
            label="Item Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Description"
            label="Description"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="duedate"
            placeholder="Due Date"
            label="Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create To-Do Item
          </Button>
        </Flex>
      </View>
      <Heading level={2}>To-Do Items</Heading>
      <View margin="3rem 0">
        {toDoItems.map((toDoItem) => (
          <Flex
            key={toDoItem.id || toDoItem.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {toDoItem.name}
            </Text>
            <Text as="span">{toDoItem.description}</Text>
            <Button variation="link" onClick={() => deleteToDoItem(toDoItem)}>
              Delete To-Do Item
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);