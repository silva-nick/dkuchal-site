import axios from "axios";

const client = axios.create({
  baseURL: "http://dku-caps.herokuapp.com",
  //baseURL: "http://localhost:3001/",
});

const corsConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
};

export const getItems = async () => {
  // Return available items
  const response = await client.get("/shop", corsConfig);
  const items = response.data.items;

  console.log(items);

  return items;
};

export const getTasks = async () => {
  // Return available tasks

  const response = await client.get("/tasks", corsConfig);
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
