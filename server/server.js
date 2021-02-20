const { response } = require("express");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

const base = require("airtable").base("appCbJwTyR6Qw1100");
/*var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "",
});
var base = Airtable.base("appCbJwTyR6Qw1100");*/

app.get("/items", async function (request, respose, next) {
  console.log(request.body);

  try {
    const items = [];
    const records = await base("items").select({ view: "Grid view" }).all();
    records.map((record) => {
      record = record._rawJson.fields;
      items.push(record);
    });

    console.log(items);
    response.json({ items: items });
  } catch (error) {
    next(error);
  }

  response.end();
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

// Status code 404 middleware
app.use(function (req, res, next) {
  res.status(404);
  res.send("<h1>404: File Not Found</h1><p>howd you get here</p>");
});

// Status code 500 middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("500", { error: err });
});

// Start Server
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
