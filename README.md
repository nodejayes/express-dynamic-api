# express-dynamic-api
Dynamic API based on File Structure

Example:

```
var cfg     = require("./config.json");
var http    = require("http");
var express = require("express");
var app     = express(http.createServer);
var api     = require("express-dynamic-api");

api(__dirname, cfg, express.Router(), app);

app.listen(3030, "localhost", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Testserver running...");
  }
});
```

---

### 1. The Configuration

At First the config.json was loaded. They must contains the Keys for the Routepath (routepath) and Api Name (routealias).

```
{
  "routepath": "routes",
  "routealias": "api"
}
```

---

### 2. Create a Express Server Instance
Then the Express Server was initialized

```
var http    = require("http");
var express = require("express");
var app     = express(http.createServer);
var api     = require("express-dynamic-api");
```

---

### 3. Initialize the API

| Parameter        | Description             |
|------------------|-------------------------|
| __dirname        | Root Directory          |
| cfg              | the Configuration       |
| express.Router() | the Express Router      |
| app              | the Express Application |

```
api(__dirname, cfg, express.Router(), app);
```

---

### 4. Create a new Route

```
var methods = {
  "get": function (req, res) {
    res.send("Hello World! this is Route1");
  },
  "post": function (req, res) {

  },
  "put": function (req, res) {

  },
  "delete": function (req, res) {

  }
};

module.exports = methods;
```

Now you can call the Route by following URL Example

> GET    http://localhost:3030/api/route1 enter get Method

> POST   http://localhost:3030/api/route1 enter post Method

> PUT    http://localhost:3030/api/route1 enter put Method

> DELETE http://localhost:3030/api/route1 enter delete Method
