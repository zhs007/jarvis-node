"use strict";

const level = require('level-rocksdb');
const { log } = require('./util');

class NetCoreDB {
    constructor(dbfilename) {
        this.dbfilename = dbfilename;
        this.db = undefined;
    }

    // callback(isok)
    start(callback) {
        this.db = undefined;

        level(this.dbfilename, { createIfMissing: true }, (err, db) => {
            if (err) {
                log('error', err);

                callback(false);

                return ;
            }

            this.db = db;

            callback(true);
        });
    }

    // callback({nameid, nodeAddr})
    getMyInfo(callback) {
        if (!this.db) {
            callback(undefined);

            return ;
        }        

        this.db.get('myinfo', (err, value) => {
            if (err) {
                callback(undefined);

                return ;
            }

            callback(JSON.parse(value));
        });
    }

    // callback(isok)
    updMyInfo(nameid, nodeAddr, callback) {
        if (!this.db) {
            callback(false);

            return ;
        }        

        this.db.put('myinfo', JSON.stringify({nameid: nameid, nodeAddr: nodeAddr}), (err) => {
            if (err) {
                callback(false);

                return ;
            }

            callback(true);
        });
    }

    // callback(isok)
    addNode(nameid, nodeAddr, callback) {
        if (!this.db) {
            callback(false);

            return ;
        }

        this.db.put('netcore:' + nameid, nodeAddr, (err) => {
            if (err) {
                callback(false);

                return ;
            }

            callback(true);
        });
    }

    // callback(isok)
    removeNode(nameid, callback) {
        if (!this.db) {
            callback(false);

            return ;
        }

        this.db.del('netcore:' + nameid, (err) => {
            if (err) {
                callback(false);

                return ;
            }

            callback(true);
        });
    }

    // callback({nameid, nodeAddr})
    foreachNode(callback) {
        if (!this.db) {
            callback(undefined);

            return ;
        }

        this.db.createReadStream({ keys: true, values: true, limit: -1 }).on('data', (data) => {
            let arr = data.key.split(':');
            if (arr.length == 2) {
                callback({ nameid: arr[1], nodeAddr: data.value });
            }

        }).on('error', (err) => {
            log('error', 'NetCoreDB.foreachNode() err ' + err);

            // callback(undefined);
        }).on('close', () => {
            log('info', 'NetCoreDB.foreachNode() close.');
        }).on('end', () => {
            log('info', 'NetCoreDB.foreachNode() end.');

            callback(undefined);
        });
    }
};

exports.NetCoreDB = NetCoreDB;