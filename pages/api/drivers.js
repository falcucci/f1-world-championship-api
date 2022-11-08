const fetch = require("node-fetch");

const GetDriversQuery = `
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

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
