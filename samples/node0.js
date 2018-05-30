"use strict";

const { JarvisNode } = require('../index');

const cfg = {
    nodeAddr: '0.0.0.0:7777'
};

const node = new JarvisNode(cfg);
node.start(() => {});
