import 'reflect-metadata';
import { EmailResolver } from './Logic/EmailResolver';
import { buildSchema } from 'type-graphql/dist/utils';
import { DatabaseService } from './Logic/DatabaseService';
import { authChecker } from './Logic/AuthChecker'
import config from 'config';
import express from 'express';
import https from 'https'
import http from 'http'
import fs from 'fs';
import { ApolloServer } from 'apollo-server-express';

(async () => {

  await DatabaseService.init();

  const schema = await buildSchema({
    resolvers: [EmailResolver],
    authChecker: authChecker
  });

  // console.log(printSchema(schema));
  const PORT = <Number> config.get('Port')
  const DEBUG = <boolean> config.get('Debug');
  const USE_SSL = <boolean> config.get('Use_Https');

  // Create the GraphQL server
  const apollo = new ApolloServer({
    schema,
    playground: DEBUG,
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();
  apollo.applyMiddleware({ app });

  let server;
  if(USE_SSL){
    server = https.createServer(
      {
        key: fs.readFileSync(config.get('SSLKeyPath')),
        cert: fs.readFileSync(config.get('SSLCertPath'))
      },
      app
    )
  }else{
    server = http.createServer(app)
  }


  // Start the server
  server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available`);
  // const { url } = await apollo.listen(PORT);
  // if(DEBUG)
  //   console.log(`Server is running, GraphQL Playground available at ${url}`);

})();