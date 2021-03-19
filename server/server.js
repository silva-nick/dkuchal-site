// Setup Express
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json(corsOptions));
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../build")));
app.options("*", cors());

// Setup Multer
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const fs = require("fs");

// Setup Airtable
const base = require("airtable").base("appCbJwTyR6Qw1100");
/*var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "key1yVlhEldCllEqO",
});
const base = Airtable.base("appCbJwTyR6Qw1100");*/

// Setup Box-API
var BoxSDK = require("box-node-sdk");
var sdk = new BoxSDK({
  clientID: "ver9gd1kapne7q4bomw9x3bbvbpj30a0",
  clientSecret: "Hi3U7mOaiLmOcvsHq8XKq9nAiejF8h8A",
});

/* ======================================================================================== */
// Endpoints

// Serve tasks
app.get("/api/alltasks", async (request, response, next) => {
  //console.log(request.url);
  //console.log(request.hostname);

  try {
    const tasks = [];
    const records = await base("tasks").select({ view: "Grid view" }).all();
    records.map((record) => {
      record = record._rawJson.fields;
      tasks.push(record);
    });

    //console.log(tasks);
    response.json({ tasks: tasks });

    response.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Serve Items
app.get("/api/allitems", async (request, response, next) => {
  //console.log(request.body);

  try {
    const items = [];
    const records = await base("items").select({ view: "Grid view" }).all();
    records.map((record) => {
      record = record._rawJson.fields;
      items.push(record);
    });

    //console.log(items);
    response.json({ items: items });

    response.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// All new temp upload
app.post(
  "/api/temp/:hash",
  upload.single("file"),
  (request, response, next) => {
    let file = request.file;
    console.log("temp request", file);

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    var tempFile = fs.createReadStream(file.path);
    var fileDest = fs.createWriteStream("uploads/" + request.params.hash);

    tempFile.pipe(fileDest);
    fs.unlinkSync(file.path);

    tempFile.on("end", () => {
      response.header(200);
      response.end();
    });
    tempFile.on("error", (err) => {
      next(err);
    });
  }
);

app.get("/api/temp/:hash", async (request, response, next) => {
  //console.log(request);
  const hash = request.params.hash;
  try {
    const data = await fs.promises.readFile("./uploads/" + hash);
    response.header(200);
    response.send(data);
    response.end();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Add new submit request
app.put("/api/submit-one", async (request, response, next) => {
  console.log(request.body);

  var newRecordID;
  base("submissions").create(
    [{ fields: request.body }],
    function (err, record) {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      newRecordID = record[0].getId();
    }
  );

  let airtableFinished, checkFinished, checkFinishedLoop;
  checkFinished = async () => {
    try {
      // Check if airtable is finished uploading
      base("submissions").find(newRecordID, function (err, record) {
        if (err) {
          clearInterval(checkFinishedLoop);
          console.error(err);
          next(err);
          return;
        }
        record = record._rawJson;
        console.log(record);
        airtableFinished = record.file && record.file[0].thumbnails;
      });
      airtableFinished = 1;

      if (airtableFinished) {
        // Delete image on server
        console.log(request.body.file[0].url);
        const hash = request.body.file[0].url.substring(
          request.body.file[0].url.indexOf("temp/") + 5
        );
        console.log(hash);

        fs.unlinkSync("./uploads/" + hash);
        clearInterval(checkFinishedLoop);
        response.header(200);
        response.end();
      }
    } catch (error) {
      console.log(error);
      clearInterval(checkFinishedLoop);
      next(error);
      return;
    }
  };

  checkFinishedLoop = setInterval(function () {
    checkFinished();
  }, 2000);
});

// Add new two submit request
app.put("/api/submit-two", async (request, response, next) => {
  console.log(request.body);

  var newRecordID;
  base("submissions").create(
    [{ fields: request.body }],
    function (err, record) {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      newRecordID = record[0].getId();
    }
  );

  let airtableFinished, checkFinished, checkFinishedLoop;
  checkFinished = async () => {
    try {
      // Check if airtable is finished uploading
      base("submissions").find(newRecordID, function (err, record) {
        if (err) {
          clearInterval(checkFinishedLoop);
          console.error(err);
          next(err);
          return;
        }
        record = record._rawJson;
        console.log(record);
        airtableFinished =
          record.file &&
          record.file[0].thumbnails &&
          record.filetwo &&
          record.filetwo.file[0].thumbnails;
      });
      airtableFinished = 1;

      if (airtableFinished) {
        // Delete image on server
        console.log(request.body.file[0].url);
        const hash = request.body.file[0].url.substring(
          request.body.file[0].url.indexOf("temp/") + 5
        );
        console.log(hash);

        fs.unlinkSync("./uploads/" + hash);
        clearInterval(checkFinishedLoop);
        response.header(200);
        response.end();
      }
    } catch (error) {
      console.log(error);
      clearInterval(checkFinishedLoop);
      next(error);
      return;
    }
  };

  checkFinishedLoop = setInterval(function () {
    checkFinished();
  }, 3000);
});

// Create video link
app.post(
  "/api/linkgen/:hash",
  upload.single("file"),
  (request, response, next) => {
    let file = request.file;
    console.log("video request request", file);

    if (!file) {
      const error = new Error("Please upload a video");
      error.httpStatusCode = 400;
      return next(error);
    }

    var tempFile = fs.createReadStream(file.path);
    var fileDest = fs.createWriteStream("uploads/" + request.params.hash);

    tempFile.pipe(fileDest);
    fs.unlinkSync(file.path);

    tempFile.on("end", () => {
      var authorize_url = sdk.getAuthorizeURL({
        response_type: "code",
      });

      response.header(200);
      response.json({ redirect: authorize_url });
      response.end();
    });
    tempFile.on("error", (err) => {
      next(err);
    });
  }
);

// Deal with accepted user auth
app.get("/api/authcallback", (request, response, next) => {
  console.log(request);
  let code = request.query.code;

  sdk.getTokensAuthorizationCodeGrant(code, null, function (err, tokenInfo) {
    if (err) {
      next(err);
    }
    console.log(tokenInfo);
    response.redirect(
      "https://mw-challenge.xyz/tasks/submit?token=" +
        encodeURIComponent(JSON.stringify(tokenInfo))
    );
  });

  // Create client and generate link
  app.get("/api/linkgen", (request, response, next) => {
    console.log(request);

    var client = sdk.getPersistentClient(request.data.token);
    let hash = request.data.hash;

    let upload = fs.createReadStream("./uploads/" + hash);

    client.files
      .uploadFile("mw-challenge", hash, upload)
      .then((fileObject) => {
        client.files
          .get(fileObject.id, { fields: "shared_link" })
          .then((file) => {
            let url = file.shared_link.download_url;
            // Delete temp hosted file
          });
      })
      .catch((error) => {
        next(error);
      });
  });
});

// Add new video submit request
app.put("/api/submit-vid", async (request, response, next) => {
  console.log(request.body);

  var newRecordID;
  base("submissions").create(
    [{ fields: request.body }],
    function (err, record) {
      if (err) {
        console.log(err);
        next(err);
        return;
      }
      newRecordID = record[0].getId();
    }
  );
});

// Backup serve to index, backup for refresh
const ENDPOINTS = [
  "/tasks",
  "/shop",
  "/login",
  "/",
  "/tasks/submit",
  "/signup",
];
ENDPOINTS.map((endpoint) => {
  app.get(endpoint, (request, response) => {
    response.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
});

// Status code 404 middleware
app.use(function (request, response) {
  response.status(404);
  response.send("<h1>404: File Not Found</h1><p>howd you get here</p>");
  response.end();
});

// Status code 500 middleware
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err);
  res.end();
});

// Start Server
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
