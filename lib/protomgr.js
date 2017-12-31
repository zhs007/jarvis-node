"use strict";

class ProtoMgr {
    constructor() {
        this.mapFactory = {};
    }

    // servfuns is like (grpcserv) => { grpcserv.addService(...); }
    // clientfuns is like (cfg) => { return new grpcclient(...); }
    regProto(protoname, servfunc, clientfunc, proto) {
        this.mapFactory[protoname] = {
            addServProto: servfunc,
            newClient: clientfunc,
            proto: proto
        };
    }

    buildServ(serv) {
        for (let ii = 0; ii < serv.cfg.lstproto.length; ++ii) {
            let protoname = serv.cfg.lstproto[ii];
            if (this.mapFactory.hasOwnProperty(protoname)) {
                this.mapFactory[protoname].addServProto(serv.serv);
            }
        }
    }

    newClient(cfg) {
        if (this.mapFactory.hasOwnProperty(cfg.proto)) {
            return this.mapFactory[cfg.proto].newClient(cfg);
        }

        return undefined;
    }

    getProto(protoname) {
        if (this.mapFactory.hasOwnProperty(protoname)) {
            return this.mapFactory[protoname].proto;
        }

        return undefined;
    }
};

ProtoMgr.singleton = new ProtoMgr();

exports.ProtoMgr = ProtoMgr;