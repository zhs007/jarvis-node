"use strict";

const grpc = require('grpc');

class JarvisServ {
    // cfg.host - 0.0.0.0
    // cfg.port - 3721
    // cfg.lstproto - ['jarvistask', ...]
    constructor(cfg) {
        this.serv = new grpc.Server();

        this.cfg = cfg;
    }

    start() {
        this.serv.start();
    }
};

exports.JarvisServ = JarvisServ;