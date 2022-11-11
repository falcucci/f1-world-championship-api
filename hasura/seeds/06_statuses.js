const csvToJson = require("convert-csv-to-json");

exports.seed = async function (knex) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("./../__data__/dataset/status.csv");

  const nValues = values.map(value => {
    return {
      id: value.statusId,
      status: value.status[0],
    };
  });

  const chunkSize = 1000;
  await knex.batchInsert("statuses", nValues, chunkSize);
};
