var reroutes = {};

module.exports = {
    add: function (from, to) {
        reroutes[from] = to;
    },
    middleware: function(req, res, next) {
        if (reroutes.hasOwnProperty(req.url)) {
            req.url = reroutes[req.url];
        }
        return next();
    }
}
