const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")));

app.post("/api", function (request, respose) {
  console.log(request.body);
  //respose.json(consoleAPI(request.body)); // Function that returns json
  respose.end();
});

app.use(function (req, res, next) {
  res.status(404);
  res.send("<h1>404: File Not Found</h1><p>howd you get here</p>");
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("500", { error: err });
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
