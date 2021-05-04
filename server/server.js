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

// Setup bcrypt for hashing
const bcrypt = require("bcrypt");

/* ======================================================================================== */
// Endpoints

// Serve tasks
app.get("/api/alltasks", async (request, response, next) => {
  //console.log(request.url);
  //console.log(request.hostname);

  try {
    const tasks = [[]];
    const records = await base("tasks").select({ view: "Grid view" }).all();
    records.map((record) => {
      record = record._rawJson.fields;
      switch (record.week) {
        case "one":
          record.week = 1;
          break;
        case "two":
          record.week = 2;
          break;
        case "three":
          record.week = 3;
          break;
        default:
          break;
      }
      while (tasks.length < record.week) {
        tasks.push([]);
      }
      tasks[record.week - 1].push(record);
    });

    //console.log(tasks);
    response.json({ tasks: tasks });
    response.end();
    return;
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
});

// Serve Items
app.get("/api/allitems", async (request, response, next) => {
  //console.log(request.body);

  try {
    const items = [[]];
    const records = await base("items").select({ view: "Grid view" }).all();
    records.map((record) => {
      record = record._rawJson.fields;
      while (items.length < record.tier) {
        items.push([]);
      }
      items[record.tier - 1].push(record);
    });

    //console.log(items);
    response.json({ items: items });
    response.end();
    return;
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
});

// Create new user
app.put("/api/user", async (request, response, next) => {
  console.log(request.body);

  const saltRounds = 8;

  var newRecordID;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      next(err);
    }
    bcrypt.hash(request.body.pswd, salt, function (err, hash) {
      if (err) {
        next(err);
      }
      request.body.pswd = hash;
      base("users").create([{ fields: request.body }], function (err, record) {
        if (err) {
          console.log(err);
          next(err);
          return;
        }
        newRecordID = record[0].getId();
      });
    });
  });

  let airtableFinished, checkFinished, checkFinishedLoop;
  checkFinished = async () => {
    try {
      // Check if airtable is finished uploading
      base("users").find(newRecordID, function (err, record) {
        if (err) {
          clearInterval(checkFinishedLoop);
          console.error(err);
          next(err);
          return;
        }
        record = record._rawJson;
        console.log(record);
        airtableFinished = record.picture && record.picture[0].thumbnails;
      });
      airtableFinished = 1;

      if (airtableFinished) {
        // Delete image on server
        console.log(request.body.picture[0].url);
        const hash = request.body.picture[0].url.substring(
          request.body.picture[0].url.indexOf("temp/") + 5
        );
        console.log(hash);

        fs.unlinkSync("./uploads/" + hash);
        clearInterval(checkFinishedLoop);
        response.status(200);
        response.end();
        return;
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

// Try new login
app.put("/api/login", async (request, response, next) => {
  console.log(request.body);

  let netid = request.body.netid;
  let pswd = request.body.pswd;

  const records = await base("users").select({ view: "Grid view" }).all();

  index = 0;
  for (record of records) {
    record = record._rawJson.fields;
    if (record.netidone === netid || record.netidtwo === netid) {
      console.log("hit!");
      bcrypt.compare(pswd, record.pswd, function (err, result) {
        if (err) {
          next(err);
        } else if (result) {
          delete record.pswd;
          delete record.points;
          delete record.created;
          delete record.picture;
          response.status(200);
          response.json(record);
          response.end();
        } else {
          response.status(404);
          response.send("No account found/ incorrect password.");
          response.end();
        }
      });
      return;
    }
    if (index++ === records.length - 1) {
      console.log("404");
      response.status(404);
      response.end();
    }
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
      response.status(200);
      response.end();
      return;
    });
    tempFile.on("error", (err) => {
      next(err);
      return;
    });
  }
);

app.get("/api/temp/:hash", async (request, response, next) => {
  //console.log(request);
  const hash = request.params.hash;
  try {
    const data = await fs.promises.readFile("./uploads/" + hash);
    response.status(200);
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
        response.status(200);
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
        response.status(200);
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
  }, 4000);
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

      response.status(200);
      response.json({ redirect: authorize_url });
      response.end();
      return;
    });
    tempFile.on("error", (err) => {
      next(err);
      return;
    });
  }
);

// Deal with accepted user auth
app.get("/api/authcallback", (request, response, next) => {
  //console.log(request);
  let code = request.query.code;

  sdk.getTokensAuthorizationCodeGrant(code, null, function (err, tokenInfo) {
    if (err) {
      next(err);
    }
    console.log(tokenInfo);
    // Encrypt
    response.redirect(
      "https://mw-challenge.xyz/tasks/submit?token=" +
        encodeURIComponent(JSON.stringify(tokenInfo))
    );
  });
  return;
});

// Create client and generate link
app.put("/api/linkgen", (request, response, next) => {
  //console.log(request);

  var client = sdk.getPersistentClient(request.body.token);
  let hash = request.body.hash;

  let upload = fs.createReadStream("./uploads/" + hash);

  client.files
    .uploadFile("0", hash, upload)
    .then((fileObject) => {
      client.files
        .update(fileObject.entries[0].id, {
          shared_link: {
            access: "open",
            permissions: {
              can_download: true,
            },
          },
        })
        .then((file) => {
          // Delete temp hosted file
          fs.unlinkSync("./uploads/" + hash);
          //console.log("File Object has been getted.", file);
          response.status(200);
          response.send({ link: file.shared_link.download_url });
          response.end();
        });
    })
    .catch((error) => {
      fs.unlinkSync("./uploads/" + hash);
      next(error);
    });
});

// Add new video submit request
app.put("/api/submit-vid", async (request, response, next) => {
  console.log(request.body);

  base("submissions").create(
    [{ fields: request.body }],
    function (err, record) {
      if (err) {
        console.log(err);
        next(err);
        return;
      } else {
        response.status(200);
        response.end();
      }
    }
  );
});

// Get all leaders
app.get("/api/leaderboard", async (request, response, next) => {
  try {
    const oldRecords = await base("old-leaderboard")
      .select({ view: "Grid view" })
      .all();
    let oldLeaderboard = {};
    oldRecords.map((record, index) => {
      record = record._rawJson.fields;
      oldLeaderboard[record.nameone] = index;
    });

    const leaders = [];
    const records = await base("users").select({ view: "Grid view" }).all();

    for (let rIndex in records) {
      if (rIndex == 0) rIndex++;
      if (
        records[rIndex - 1]._rawJson.fields.points <
        records[rIndex]._rawJson.fields.points
      ) {
        records.sort((a, b) => {
          return b._rawJson.fields.points - a._rawJson.fields.points;
        });
        break;
      }
    }

    records.map((record, index) => {
      record = record._rawJson.fields;

      //delete record.netidone; // For top 3 display
      delete record.netidtwo;
      delete record.pswd;
      delete record.claims;
      delete record.created;

      record["status"] = oldLeaderboard[record.nameone] - index;

      leaders.push(record);
    });

    //console.log(items);
    response.json({ leaders: leaders });
    response.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get a user's submissions
app.get("/api/submissions", async (request, response, next) => {
  try {
    const userNetid = request.query.netid;
    const submissions = [];
    const records = await base("submissions")
      .select({ view: "Grid view" })
      .all();

    records.map((record, index) => {
      record = record._rawJson.fields;

      if (record.netidone == userNetid || record.netidtwo == userNetid) {
        delete record.netidone;
        delete record.netidtwo;
        delete record.nameone;
        delete record.nametwo;
        delete record.filetwo;
        delete record.filebackup;
        submissions.push(record);
      }
    });

    //console.log(items);
    response.json({ submissions: submissions });
    response.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get a single user
app.get("/api/user", async (request, response, next) => {
  try {
    const userNetid = request.query.netid;
    const user = [];
    const records = await base("users").select({ view: "Grid view" }).all();

    for (let record of records) {
      record = record._rawJson.fields;
      if (record.netidone == userNetid || record.netidtwo == userNetid) {
        delete record.netidone;
        delete record.netidtwo;
        delete record.pswd;
        delete record.claims;
        user.push(record);
        break;
      }
    }

    //console.log(items);
    response.json({ user: user });
    response.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Backup serve to index, backup for refresh
const ENDPOINTS = [
  "/",
  "/tasks",
  "/tasks/submit",
  "/tasks/submitbackup",
  "/shop",
  "/about",
  "/leaderboard",
  "/login",
  "/signup",
  "/profile",
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
