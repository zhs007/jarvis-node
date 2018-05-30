"use strict";

const { JarvisNode } = require('../index');

const cfg = {
    nodeAddr: '0.0.0.0:7778',
    destNodeAddr: '0.0.0.0:7777',
    dbname_netcore: './db/netcore1.rocksdb'
};

const node = new JarvisNode(cfg);
node.start(() => {});
