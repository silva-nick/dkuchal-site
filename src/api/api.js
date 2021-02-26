import axios from "axios";

import test from "./test.jpg";

const client = axios.create({
  baseURL: "https://dku-caps.herokuapp.com/",
  //baseURL: "http://localhost:3001/",
});

export const getItems = async () => {
  // Return available items
  const response = await client.get("/items");
  const items = response.data.items;

  console.log(items);

  return items;
};

export const getTasks = async () => {
  // Return available tasks

  const response = await client.get("/taskitems");
  const tasks = response.data.tasks;

  console.log(tasks);

  return tasks;
};

export const putPerson = async () => {
  // create new person
  return 0;
};

export const updatePerson = async () => {
  // update existing person
  return 0;
};

export const putSubmission = async () => {
  // update existing person
  return 0;
};

export const putClaim = async () => {
  // update existing person
  return 0;
};

export default {
  getItems,
  getTasks,
  putPerson,
  updatePerson,
  putSubmission,
  putClaim,
};
