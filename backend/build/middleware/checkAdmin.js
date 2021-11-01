"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAdmin(req, res, next) {
    var user = req.user;
    if (user.isAdmin) {
        return next();
    }
    else {
        return res.status(401).json({ error: "You must be an administrator!!!" });
    }
}
exports.default = checkAdmin;
