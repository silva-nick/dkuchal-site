import axios from "axios";

import test from "./test.jpg";
// TODO: get items, get challenges, post completed challenge?, login?

const client = axios.create({
  baseURL: "serverurl.com",
});

export const getItems = async () => {
  // Return available items
  //const { items } = await client.get("/items");
  let items = [];
  console.log(test);
  for (let i = 0; i < 30; i++) {
    items.push({
      img: test,
      name: "Cool Shoes!",
      tier: 3,
      text:
        "This is an amazing prize that will inspire you to reach out and make new friends.",
      code: "test",
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
      code: "test",
    });
  }

  return tasks;
};

export default { getItems, getTasks };


