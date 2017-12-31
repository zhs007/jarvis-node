"use strict";

const { PROTO_JARVISTASK, ProtoMgr, log } = require('../index');

const cfg = {
    host: '127.0.0.1',
    port: 7777,
    proto: PROTO_JARVISTASK
};

const client = ProtoMgr.singleton.newClient(cfg);
const proto = ProtoMgr.singleton.getProto(PROTO_JARVISTASK);

client.chgTaskState({taskState: proto.TaskState.START, taskid: 'task'}, (err, response) => {
    log('info', err);
    log('info', response);
});