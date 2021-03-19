import axios from "axios";

const baseURL = "https://dku-caps.herokuapp.com/api/";
//const baseURL = "http://localhost:3001/api/";

const client = axios.create({
  baseURL: baseURL,
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
export const putSubmission = async (raw_submission, resultCallback) => {
  //console.log(raw_submission.file);

  const type = raw_submission.type;
  delete raw_submission.type;

  var formdata = new FormData();
  formdata.append("file", raw_submission.file);

  let fileHash =
    Date.now() +
    "." +
    raw_submission.file.type.substring(
      raw_submission.file.type.indexOf("/") + 1
    );

  if (type === 1) {
    client
      .post("/temp/" + fileHash, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Temp host response: ", response);

        raw_submission.file = [{ url: baseURL + "temp/" + fileHash }];

        client
          .put("/submit-one", raw_submission)
          .then((response) => {
            console.log("Submission response", response);
            resultCallback(true);
          })
          .catch((error) => {
            console.log("error", error);
            resultCallback(false);
          });
      })
      .catch((error) => {
        console.log("error", error);
        resultCallback(false);
      });
  } else if (type === 2) {
    let fileTwoHash =
      Date.now() +
      "." +
      raw_submission.filetwo.type.substring(
        raw_submission.filetwo.type.indexOf("/") + 1
      );

    client
      .post("/temp/" + fileHash, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Temp host response 1: ", response);

        var formdata = new FormData();
        formdata.append("file", raw_submission.filetwo);

        client
          .post("/temp/" + fileTwoHash, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("Temp host response 2: ", response);

            raw_submission.file = [{ url: baseURL + "temp/" + fileHash }];
            raw_submission.filetwo = [{ url: baseURL + "temp/" + fileTwoHash }];

            client
              .put("/submit-two", raw_submission)
              .then((response) => {
                console.log("Submission response", response);
                resultCallback(true);
              })
              .catch((error) => {
                console.log("error", error);
                resultCallback(false);
              });
          })
          .catch((error) => {
            console.log("error", error);
            resultCallback(false);
          });
      })
      .catch((error) => {
        console.log("error", error);
        resultCallback(false);
      });
  } else {
    console.log(raw_submission);
    raw_submission.file = null;
    raw_submission.filetwo = null;
    client
      .put("/submit-vid", raw_submission)
      .then((response) => {
        console.log("Submission response", response);
        resultCallback(true);
      })
      .catch((error) => {
        console.log("error", error);
        resultCallback(false);
      });
    return;
  }
};

export const getBoxToken = async (video, fileHash, resultCallback) => {
  var formdata = new FormData();
  formdata.append("file", video);

  client
    .post("/linkgen/" + fileHash, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log("Temp host response: ", response);
      resultCallback(response.data.redirect);
    })
    .catch((error) => {
      console.log("error", error);
      resultCallback(false);
    });
  return;
};

export const getVideoLink = async (token, hash, resultCallback) => {
  await client
    .put("/linkgen2/", { token: token, hash: hash })
    .then((response) => {
      console.log(response);
      resultCallback(response.data.url);
    });
  return;
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
  getBoxToken,
  getVideoLink,
  putClaim,
};
