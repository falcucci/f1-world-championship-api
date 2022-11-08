const csvToJson = require("convert-csv-to-json");

exports.seed = function (knex) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("./../circuits.csv");

  const nValues = values.map(value => {
    return {
      id: value.circuitId,
      circuit_ref: value.circuitRef[0],
      name: value.name[0],
      location: value.location[0],
      country: value.country[0],
      lat: parseFloat(value.lat) || undefined,
      lng: parseFloat(value.lng) || undefined,
      alt: parseFloat(value.alt) || undefined,
      url: value.url[0],
    };
  });

  return knex('circuits').insert(nValues)

};
