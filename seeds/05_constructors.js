const csvToJson = require("convert-csv-to-json");

exports.seed = function (knex, Promise) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("constructors.csv");

  const nValues = values.map(value => {
    return {
      id: value.constructorId,
      constructor_ref: value.constructorRef[0],
      name: value.name[0],
      nationality: value.nationality[0],
      url: value.url[0],
    };
  });

  return knex("constructors").insert(nValues);
};
