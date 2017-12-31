"use strict";

const { JarvisServ, PROTO_JARVISTASK, ProtoMgr } = require('../index');

const cfg = {
    host: '127.0.0.1',
    port: 7777,
    lstproto: [PROTO_JARVISTASK]
};

const serv = new JarvisServ(cfg);
ProtoMgr.singleton.buildServ(serv);

serv.start();
