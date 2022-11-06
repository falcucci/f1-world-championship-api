const csvToJson = require("convert-csv-to-json");

exports.seed = async function (knex, Promise) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("driver_standings.csv");

  const nValues = values.map(value => {
    return {
      id: value.driverStandingsId,
      race_id: value.raceId,
      driver_id: value.driverId,
      points: value.points,
      position: value.position,
      position_text: Number(value.positionText[0]) || undefined,
      wins: value.wins,
    };
  });

  const chunkSize = 5000;
  await knex.batchInsert("driver_standings", nValues, chunkSize);
};
