var errmap = {
        "0": {
            code: 200,
            message: "Ok"
        },
        "1": {
            code: 404,
            message: "Retro Arch Not Found"
        },
        "2": {
            code: 400,
            message: "Invalid Input Given"
        }
    },
    controlmap = {
        gba: {
            left: "Left",
            right: "Right",
            up: "Up",
            down: "Down",
            a: "x",
            b: "z",
            r: "w",
            l: "q",
            select: "Shift_R",
            start: "Return"
        }
    },
    curControl = "gba";
    exec = require("child_process").exec,
    q = require("q");

module.exports = {
    do: function(virtualKey) {
        var def = q.defer();
        if (!controlmap[curControl].hasOwnProperty(virtualKey)) {
            def.reject(new Error("Invalid Virtual Keypress"));
        } else {
            exec("bash scripts/xscrp.sh " + controlmap[curControl][virtualKey], function(err, stdout, stderr) {
                if (err) {
                    def.reject(err);
                } else {
                    def.resolve(stdout.toString());
                }
            });
        }
        return def.promise;
    },
    set controls (e) {
        if (controlmap.hasOwnProperty(e)) {
            curControl = e;
        } else {
            throw new Error("Invalid Control Scheme");
        }
    },
    get controls () {
        return curControl;
    },
    get errs () {
        return errmap;
    }
}
