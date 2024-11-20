import * as fs from 'fs';
import { gql } from 'graphql-tag';
import path from 'path';
import * as url from 'url';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolvers } from './resolvers.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const buildSchema = () => {
  const schemaFile = path.join(__dirname, './schema.gql');
  const schemaString = fs.readFileSync(schemaFile, 'utf8');

  return buildSubgraphSchema({
    typeDefs: gql(schemaString),
    resolvers,
  });
};
