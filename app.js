"use strict";
var exec = require("child_process").exec,
    level = require("levelup"),
    http = require("combi-server")({
        port: 8080,
        appname: "Pompey Plays",
        useAnsi: true,
        websocket: {
            enabled: true,
            lib: true
        }
    }),
    Form = require("formidable"),
    q = require("q"),
    reroute = require("./local_modules/reroute"),
    path = require("path"),
    x = require("./local_modules/xbridge"),
    Route = require("combi-server-router"),

    router = new Route.Router(),
    ni = require("os").networkInterfaces();

const conf = require("./conf");

console.dir(ni);

reroute.add("/", "/index.html");
reroute.add("/help", "/help.html");
reroute.add("/log", "/chat.html");

http.use(reroute.middleware);
http.use((req, res, next) => {
  let def = q.defer();
  if(req.method.toLowerCase() == "post") {
    let form = new Form.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if(err) {
        def.reject(err);
      }
      req.body = fields;
      def.resolve(next());
    });
  } else {
    def.resolve(next());
  }
  return def.promise;
});

http.static(path.join(__dirname, "public"));

// router.post("/token", (req, res) => {
//
// });

http.use(Route.middleware(router));

http.ws.do("input:json", function(conn, data) {
    x.do(data.key)
    .then(function(e) {
        conn.sendPayload("input-response", x.errs[e]);
        http.ws.broadcast(JSON.stringify({
            type: "chat",
            payload: {
                client: conn._id,
                message: "pressed " + data.key,
                mode: "self"
            }
        }))
    })
    .catch(function(err) {
        conn.sendPayload("input-response", {
            code: 400,
            message: err.message
        })
    });
})



http.listen();
