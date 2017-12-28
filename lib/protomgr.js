"use strict";

class ProtoMgr {
    constructor() {
        this.mapFactory = {};
    }

    // servfuns is like (grpcserv) => { grpcserv.addService(...); }
    // clientfuns is like (cfg) => { return new grpcclient(...); }
    regProto(protoname, servfunc, clientfunc) {
        this.mapFactory[protoname] = {
            addServProto: servfunc,
            newClient: clientfunc
        };
    }

    buildServ(serv) {
        for (let protoname in serv.cfg.lstProto) {
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
};

ProtoMgr.singleton = new ProtoMgr();

exports.ProtoMgr = ProtoMgr;