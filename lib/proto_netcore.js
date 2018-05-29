"use strict";

const { ProtoMgr } = require('./protomgr');
const { PROTO_JARVISNETCORE } = require('./protodef');
const { makeHostAddr } = require('./util');

const PROTO_PATH = __dirname + '/../proto/netcore.proto';

const grpc = require('grpc');
const task_proto = grpc.load(PROTO_PATH).jarvisnetcore;

ProtoMgr.singleton.regProto(PROTO_JARVISNETCORE, (grpcserv, node) => {
    grpcserv.addService(task_proto.JarvisNetCore.service, {
        want2Join: (call) => { node.onWant2Join(call); }
    });
}, (cfg) => {
    return new task_proto.JarvisNetCore(cfg.nodeAddr, grpc.credentials.createInsecure());
}, task_proto);