"use strict";

const { graphql,
    GraphQLNonNull,
    GraphQLList, 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');

const SCHEMA_PATH = __dirname + '/../graphql/netcore.graphql';
const STR_SCHEMA = fs.readFileSync(SCHEMA_PATH, 'utf-8');

const nodeInfoType = new GraphQLObjectType({
    name: 'NodeType',
    description: 'JarvisTask network node info',
    fields: () => ({
        nameid: {
            type: GraphQLNonNull(GraphQLString),
            description: 'JarvisTask network node nameid'
        },
        nodeAddr: {
            type: GraphQLNonNull(GraphQLString),
            description: 'JarvisTask network node addr'
        },
        clientNums: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'JarvisTask network node client nums'
        },
        connectNums: {
            type: GraphQLNonNull(GraphQLInt),
            description: 'JarvisTask network node connect nums'
        },                
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        nodes: {
            type: GraphQLNonNull(GraphQLList(nodeInfoType)),
            resolve(obj, args, ctx) {
                return [];
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: queryType
});

class DataNetCore {
    constructor() {
    }

    query(str) {
        let root = null;
        let ctx = {};
        return graphql(schema, str, root, ctx);
    }
};

exports.DataNetCore = DataNetCore;
