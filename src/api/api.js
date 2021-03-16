import axios from "axios";

const client = axios.create({
  //baseURL: "https://dku-caps.herokuapp.com/api/",
  baseURL: "http://localhost:3001/api/",
});

// Return available items
export const getItems = async () => {
  const response = await client.get("/allitems");
  const items = response.data.items;

  console.log(items);
  return items;
};

// Return available tasks
export const getTasks = async () => {
  const response = await client.get("/alltasks");
  const tasks = response.data.tasks;

  console.log(tasks);
  return tasks;
};

// Create new User
export const putUser = async (raw_users) => {
  const response = await client.put("/users", raw_users);
  console.log(response);

  return response.status === 200 ? 1 : 0;
};

// update existing User
export const updateUser = async (usrcode) => {
  const response = await client.put("/users/update", usrcode);
  console.log(response);

  return response.status === 200 ? 1 : 0;
};

// Create new submission
export const putSubmission = async (raw_submission) => {
  var headers = new Headers();
  headers.append("Authorization", "Client-ID b39c75b9d3071f5");

  var formdata = new FormData();
  formdata.append("image", raw_submission.file);

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: formdata,
    redirect: "follow",
  };

  var hash = require("object-hash");
  var imgHash = hash([
    raw_submission.nameone,
    raw_submission.usrcode,
    raw_submission.tskcode,
  ]);

  fetch("https://api.imgur.com/3/image/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  const response = await client.put("/submit", raw_submission);
  console.log(response);

  return response.status === 200 ? 1 : 0;
};

// Create new item claim
export const putClaim = async (raw_claim) => {
  const response = await client.put("/claim", raw_claim);
  console.log(response);

  return response.status === 200 ? 1 : 0;
};

export default {
  getItems,
  getTasks,
  putUser,
  updateUser,
  putSubmission,
  putClaim,
};
