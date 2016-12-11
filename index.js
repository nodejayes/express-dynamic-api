var fs = require("fs");
var pa = require("path");
var os = require("os");
var EXPRESSROUTING = null;
var BASEDIR = null;
var validMethods = ["get", "post", "put", "delete"];

function getRouteName (full) {
  let result = "/";
  let tmp = full.split(pa.sep);
  if (tmp.length < 2) {
    throw new Error("no route found");
  }
  let last = tmp[tmp.length - 1];
  tmp.splice(tmp.length - 1, 1);
  tmp.splice(0, 1);
  for (let i in tmp) {
    result += tmp[i] + "/";
  }
  result += pa.basename(last, ".js");
  return result;
}

function bindModule (path, filename) {
  var full = pa.join(path, filename);
  fs.stat(full, function (err, stat) {
    if (stat.isDirectory()) {
      main(BASEDIR, full, EXPRESSROUTING);
    } else {
      if (filename.indexOf(".js") > -1) {
        console.log("bind " + full);
        let methods = require(pa.join(BASEDIR, full));
        for (let i in methods) {
          if (validMethods.indexOf(i) > -1) {
            console.log(getRouteName(full), i);
            EXPRESSROUTING[i](getRouteName(full), methods[i]);
          }
        }
      }
    }
  });
}

function main (basedir, path, routing) {
  let files = fs.readdirSync(path);
  console.log(files);
  for (let i in files) {
    bindModule(path, files[i]);
  }
}

module.exports = function (basedir, cfg, routing, app) {
  if (!cfg) {
    throw new Error("invalid configuration!");
  } else if (!routing) {
    throw new Error("routing is not defined!");
  } else if (!basedir) {
    throw new Error("no basedir defined");
  } else {
    EXPRESSROUTING = routing;
    BASEDIR = basedir;
    let alias = cfg.routealias;
    app.use("/" + alias, EXPRESSROUTING);
    main(basedir, cfg.routepath, routing);
  }
}
