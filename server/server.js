const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../build")));

const base = require("airtable").base("appCbJwTyR6Qw1100");
/*var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "key1yVlhEldCllEqO",
});
const base = Airtable.base("appCbJwTyR6Qw1100");*/

// Serve tasks
app.get("/api/alltasks", async (request, response, next) => {
  console.log(request.url);
  console.log(request.hostname);

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
  console.log(request.body);

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

// Add new submit requests
app.put("/api/submit", async (request, response, next) => {
  console.log(request.body);

  base("submissions").create([{ fields: request.body }], function (err, record) {
    if (err) {
      console.log(err);
      response.header(500);
      response.end();
      return;
    }
  });

  response.header(200);
  response.end();
});

// Backup serve to index, backup for refresh
const ENDPOINTS = ["/tasks", "/shop", "/login", "/", "/submit", "/signup"];
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
  res.status(err.status || 500);
  res.render("500", { error: err });
  res.end();
});

// Start Server
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
