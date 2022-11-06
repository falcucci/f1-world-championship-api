const csvToJson = require("convert-csv-to-json");
const moment = require("moment");

exports.seed = function (knex, Promise) {
  const values = csvToJson
    .fieldDelimiter(",")
    .parseSubArray('"')
    .formatValueByType()
    .getJsonFromCsv("races.csv");

  const nValues = values.map(value => {
    const formattedFp1DateString =
      value.fp1_date[0].split("-").length > 1
        ? value.fp1_date[0]
        : "" +
          (value.fp1_time[0].split(":").length > 1
            ? " " + value.fp1_time
            : "");

    const formattedFp2DateString =
      value.fp2_date[0].split("-").length > 1
        ? value.fp2_date[0]
        : "" +
          (value.fp2_time[0].split(":").length > 1
            ? " " + value.fp2_time
            : "");

    const formattedFp3DateString =
      value.fp3_date[0].split("-").length > 1
        ? value.fp3_date[0]
        : "" +
          (value.fp3_time[0].split(":").length > 1
            ? " " + value.fp3_time
            : "");

    const formattedQualiDateString =
      value.quali_date[0].split("-").length > 1
        ? value.quali_date[0]
        : "" +
          (value.quali_time[0].split(":").length > 1
            ? " " + value.quali_time
            : "");

    const formattedSprintDateString =
      value.sprint_date[0].split("-").length > 1
        ? value.sprint_date[0]
        : "" +
          (value.sprint_time[0].split(":").length > 1
            ? " " + value.sprint_time
            : "");

    const formattedFp1Date = moment(formattedFp1DateString);
    const formattedFp2Date = moment(formattedFp2DateString);
    const formattedFp3Date = moment(formattedFp3DateString);
    const formattedQualiDate = moment(formattedQualiDateString);
    const formattedSprintDate = moment(formattedSprintDateString);

    const formattedDate =
      (value.date[0].split("-").length > 1
        ? value.date[0]
        : undefined) +
      (value.time[0].split(":").length > 1
        ? " " + value.time[0]
        : "");

    const timestamp = moment(formattedDate.trim());
    return {
      id: value.raceId,
      year: value.year,
      round: value.round,
      circuit_id: value.circuitId,
      name: value.name[0],
      datetime: timestamp.isValid() ? timestamp : undefined,
      url: value.url[0],
      fp1_datetime:
        formattedFp1Date && formattedFp1Date.isValid()
          ? formattedFp1Date
          : undefined,
      fp2_datetime:
        formattedFp2Date && formattedFp2Date.isValid()
          ? formattedFp2Date
          : undefined,
      fp3_datetime:
        formattedFp3Date && formattedFp3Date.isValid()
          ? formattedFp3Date
          : undefined,
      qualification_datetime:
        formattedQualiDate && formattedQualiDate.isValid()
          ? formattedQualiDate
          : undefined,
      sprint_datetime:
        formattedSprintDate && formattedSprintDate.isValid()
          ? formattedSprintDate
          : undefined,
    };
  });


  return knex("races").insert(nValues);
};
