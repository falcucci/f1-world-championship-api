const GetResultsQuery = `
query Results($ids: [Int!]) {
  results(where: {milliseconds: {_is_null: false}, race: {datetime: {}}, driver_id: {_in: $ids}}, order_by: {race: {datetime: desc}}) {
    race {
      year
      datetime
      name
    }
    milliseconds
    fastest_lap_speed
    driver_id
  }
}
`;

const GetDriversQuery = `
query Drivers($from: timestamptz!, $to: timestamptz!, $limit: Int!) {
  drivers(
    order_by: { standings_aggregate: { sum: { wins: desc } } }
    where: {
      standings: { wins: { _is_null: false } }
      result: { race: { datetime: { _gt: $from, _lt: $to } } }
    }
    limit: $limit
  ) {
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
  }
}
`;

module.exports = {
  GetDriversQuery,
  GetResultsQuery,
};
