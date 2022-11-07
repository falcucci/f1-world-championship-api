const csvToJson = require("convert-csv-to-json");

exports.seed = function (knex, Promise) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("status.csv");

  const nValues = values.map(value => {
    return {
      id: value.statusId,
      status: value.status[0],
    };
  });

  return knex("statuses").insert(nValues);
};
