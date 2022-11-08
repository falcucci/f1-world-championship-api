const csvToJson = require('convert-csv-to-json');

exports.seed = function(knex, Promise) {
  const values = csvToJson
    .fieldDelimiter(',')
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("./../drivers.csv");

  const nValues = values.map(value => {
    return {
      id: value.driverId,
      driver_ref: value.driverRef[0],
      number: parseInt(value.number) || undefined,
      code: parseInt(value.code) || '',
      forename: value.forename[0],
      surname: value.surname[0],
      dob: value.dob[0],
      nationality: value.nationality[0],
      url: value.url[0]
    }
  })
  return knex('drivers').insert(nValues)
};
