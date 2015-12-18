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
    q = require("q"),
    reroute = require("./local_modules/reroute"),
    path = require("path"),
    x = require("./local_modules/xbridge"),

    ni = require("os").networkInterfaces()["eth0"].reduce(function(p, c){if(c.family == "IPv4"){return c;}else{return p;}}, null);

console.dir(ni);

reroute.add("/", "/index.html");
reroute.add("/log", "/chat.html");

http.use(reroute.middleware);

http.static(path.join(__dirname, "public"));

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
