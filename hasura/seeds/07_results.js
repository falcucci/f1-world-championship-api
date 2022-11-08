const csvToJson = require("convert-csv-to-json");

exports.seed = async function (knex) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("./../results.csv");

  const nValues = values.map(value => {
    return {
      id: value.resultId,
      race_id: value.raceId,
      driver_id: value.driverId,
      constructor_id: value.constructorId,
      status_id: value.statusId,
      number:
        String(value.number).split("\\").length > 1
          ? undefined
          : value.number,
      grid:
        String(value.grid).split("\\").length > 1
          ? undefined
          : value.grid,
      position:
        String(value.position).split("\\").length > 1
          ? undefined
          : value.position,
      position_text:
        String(value.positionText[0]).split("\\").length > 1
          ? undefined
          : value.positionText[0],
      position_order: value.positionOrder,
      points: value.points,
      laps:
        String(value.laps).split("\\").length > 1
          ? undefined
          : value.laps,
      milliseconds:
        String(value.milliseconds).split("\\").length > 1
          ? undefined
          : value.milliseconds,
      fastest_lap:
        String(value.fastestLap).split("\\").length > 1
          ? undefined
          : value.fastestLap,
      rank:
        String(value.rank).split("\\").length > 1
          ? undefined
          : value.rank,
      fastest_lap_time:
        String(value.fastestLapTime[0]).split("\\").length > 1
          ? undefined
          : value.fastestLapTime[0],
      fastest_lap_speed:
        String(value.fastestLapSpeed[0]).split("\\").length > 1
          ? undefined
          : value.fastestLapSpeed[0],
    };
  });

  const chunkSize = 1000;
  await knex.batchInsert("results", nValues, chunkSize);
};
