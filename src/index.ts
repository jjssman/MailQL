import 'reflect-metadata';
import { EmailResolver } from './Logic/EmailResolver';
import { buildSchema } from 'type-graphql/dist/utils';
import { DatabaseService } from './Logic/DatabaseService';
import { ApolloServer } from 'apollo-server';
import { authChecker } from './Logic/AuthChecker'

(async () => {

  await DatabaseService.init();

  const schema = await buildSchema({
    resolvers: [EmailResolver],
    authChecker: authChecker
  });

  // console.log(printSchema(schema));
  const PORT = 3001
  const DEBUG = true

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
    playground: DEBUG,
    context: ({ req, res }) => ({ req, res })
  });

  // Start the server
  const { url } = await server.listen(PORT);
  if(DEBUG)
    console.log(`Server is running, GraphQL Playground available at ${url}`);

})();