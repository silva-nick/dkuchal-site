import axios from "axios";

import test from "./test.jpg";

const client = axios.create({
  //baseURL: "https://dku-caps.herokuapp.com/",
  baseURL: "http://localhost:3001/",
});

export const getItems = async () => {
  // Return available items
  console.log("/items");
  //const { items } = await client.get("/items");

  let items = [];
  console.log(items);
  for (let i = 0; i < 30; i++) {
    items.push({
      img: test,
      name: "Cool Shoes!",
      tier: 3,
      text:
        "This is an amazing prize that will inspire you to reach out and make new friends.",
      code: 0,
    });
  }

  return items;
};
export const getTasks = async () => {
  // Return available items
  let tasks = [];
  for (let i = 0; i < 30; i++) {
    tasks.push({
      title: "Fun Event!",
      points: 10,
      text: "This is an event where you are doing something with your partner.",
      code: 123,
    });
  }

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
