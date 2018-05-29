"use strict";

const grpc = require('grpc');
const { makeHostAddr, genPriKey, log } = require('./util');
const { JarvisServ } = require('./jarvis_serv');
const { ProtoMgr } = require('./protomgr');
const { PROTO_JARVISNETCORE } = require('./protodef');

class JarvisNode {
    // cfg.nodeAddr - 0.0.0.0:3721
    // cfg.destNodeAddr - 0.0.0.0:3722
    constructor(cfg) {
        this.cfg = cfg;

        this.nameid = genPriKey();
        this.nodeAddr = cfg.nodeAddr;

        cfg.lstproto = [PROTO_JARVISNETCORE];
        this.serv = new JarvisServ(cfg);

        this.mapNode = {};
        this.mapClient = {};

        ProtoMgr.singleton.buildServ(this.serv, this);
    }

    start() {
        this.serv.start();

        if (this.cfg.destNodeAddr) {
            this._newClient_NetCore(this.cfg.destNodeAddr);
        }
    }

    onWant2Join(call) {
        log('info', `new connect ${call.request.nameid}-${call.request.nodeAddr}...`);

        // send your info to others & send other info to you
        for (let curnameid in this.mapNode) {
            if (curnameid == call.request.nameid) {
                continue ;
            }

            let cn = this.mapNode[curnameid];
            call.write({
                nameid: cn.nameid, 
                nodeAddr: cn.nodeAddr
            });

            if (cn.callWant2Join) {
                cn.callWant2Join.write({
                    nameid: call.request.nameid, 
                    nodeAddr: call.request.nodeAddr
                });
            }
        }

        // send my info to you
        call.write({
            nameid: this.nameid, 
            nodeAddr: this.nodeAddr
        });

        // add you to map & connect to you
        if (this.mapNode[call.request.nameid]) {
            let cn = this.mapNode[call.request.nameid];

            cn.nodeAddr = call.request.nodeAddr;
            cn.callWant2Join = call;

            this._newClient_NetCore(cn.nodeAddr, cn.nameid);

            return ;
        }

        this.mapNode[call.request.nameid] = {
            nameid: call.request.nameid, 
            nodeAddr: call.request.nodeAddr,
            callWant2Join: call,
        };

        this._newClient_NetCore(call.request.nodeAddr, call.request.nameid);
    }

    _newClient_NetCore(nodeAddr, nameid) {
        if (!this.mapClient[nodeAddr]) {
            this.mapClient[nodeAddr] = {
                nameid: nameid,
                nodeAddr: nodeAddr,
                clientNetCore: undefined
            };
        }
        else if (nameid) {
            this.mapClient[nodeAddr].nameid = nameid;
        }

        let curclient = this.mapClient[nodeAddr];
        if (curclient.clientNetCore) {
            return ;
        }

        curclient.clientNetCore = ProtoMgr.singleton.newClient({
            nodeAddr: nodeAddr,
            proto: PROTO_JARVISNETCORE
        });

        log('info', `new client ${nameid}-${nodeAddr}...`);

        curclient.clientNetCore.want2Join({nameid: this.nameid, nodeAddr: this.nodeAddr}, (msg) => {
            if (msg == undefined) {
                return ;
            }

            if (this.mapNode[msg.nameid]) {
                this._newClient_NetCore(msg.nodeAddr, msg.nameid);

                return ;
            }

            this.mapNode[msg.nameid] = {
                nameid: msg.nameid, 
                nodeAddr: msg.nodeAddr,
                callWant2Join: undefined
            };
    
            this._newClient_NetCore(msg.nodeAddr, msg.nameid);
        });
    }
};

exports.JarvisNode = JarvisNode;