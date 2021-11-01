"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logQueryMongoose = function (err, data) {
    if (err) {
        console.log("error:", err);
    }
    else {
        console.log("data:", data);
    }
};
exports.default = logQueryMongoose;
