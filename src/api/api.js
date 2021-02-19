import axios from "axios";

// TODO: get items, get challenges, post completed challenge?, login?

const client = axios.create({
  baseURL: "serverurl.com",
});

export const getItems = async () => {
  // Return available items
};


export default { getItems };
