let express = require('express');
let graphqlHTTP = require('express-graphql');
// let { graphql, buildSchema } = require('graphql'); #0
let { buildSchema } = require('graphql');

// #1
// let schema = buildSchema(`
//     type Query {
//         hello: String
//     }`);

// let root = {
//   hello: () => {
//     return 'Hello World!';
//   },
// };

// #2
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// #1
// let app = express();
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   }),
// );

// The root provides a resolver function for each API endpoint
// #2
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};

// #2
var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

// #1
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');

// #0
// graphql(schema, '{hello}', root).then(response => {
//   console.log(response);
// });
