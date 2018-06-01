"use strict";

const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');

const SCHEMA_PATH = __dirname + '/../graphql/netcore.graphql';
const STR_SCHEMA = fs.readFileSync(SCHEMA_PATH, 'utf-8');

const RESOLVERS = {
    Query: {
        nodes(root, {}, context, {}) {
            
        }
    }
};

class DataNetCore {
    constructor() {

    }
};

exports.DataNetCore = DataNetCore;
