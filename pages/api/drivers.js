const fetch = require("node-fetch");
const DRIVERS_QUERY = `
query GetDrivers {
  drivers(order_by: {standings_aggregate: {sum: {wins: desc}}}, where: {standings: {wins: {_is_null: false}}}, limit: 10) {
    id
    forename
    surname
    standings_aggregate {
      aggregate {
        sum {
          wins
        }
      }
    }
    result(where: {milliseconds: {_is_null: false}, race: {}}) {
      race {
        year
        datetime
        name
      }
      milliseconds
      fastest_lap_speed
    }
  }
}
`;

export default async function handler(req, res) {
  const { data, errors } = await queryHasura(DRIVERS_QUERY)
  res.status(200).json( data.drivers );
}

async function queryHasura(query) {
  const response = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({ query: query}),
    }
  );
  return await response.json();
}
