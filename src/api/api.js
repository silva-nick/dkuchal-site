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
  var formdata = new FormData();
  //formdata.append("image", raw_submission.file);
  formdata.append("image", raw_submission.file);

  var requestOptions = {
    method: "POST",
    headers: new Headers({ Authorization: "Client-ID 3aee61ef688768b" }),
    body: formdata,
  };

  fetch("https://api.imgur.com/3/image", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("wtf", result);
      // remove file from raw_submission
      client
        .put("/submit", raw_submission)
        .then((response) => {
          console.log(response);

          return response.status === 200 ? 1 : 0;
        })
        .catch((error) => {
          console.log("error", error);
          return 0;
        });
    })
    .catch((error) => {
      console.log("error", error);
      return 0;
    });
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
