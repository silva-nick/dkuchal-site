import axios from "axios";

// TODO: get items, get challenges, post completed challenge?, login?

const client = axios.create({
  baseURL: "serverurl.com",
});

export const getItems = async () => {
  // Return available items
};
export const getTasks = async () => {
  // Return available items
  let tasks = [];

  for (let i = 0; i < 30; i++) {
    tasks.push({
      title: "Fun Event!",
      subtitle: "10 points",
      text: "This is an event where you are doing something with your partner.",
    });
  }

  return tasks;
};

export default { getItems, getTasks };
