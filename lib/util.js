"use strict";

function makeHostAddr(host, port) {
    return host + ':' + port;
}

exports.makeHostAddr = makeHostAddr;