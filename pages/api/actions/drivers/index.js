const _ = require("lodash");
const config = require("config");
const joi = require("joi").extend(require("@joi/date"));

const { StatusCodes } = require("http-status-codes");
const {
  fetchGraphQL,
} = require("../../../../hasura/utils/functions");
const {
  GetDriversQuery,
  GetResultsQuery,
} = require("../../../../hasura/utils/queries");

/**
 * Dispatch a req, res into the serveless function.
 * @async
 */
export default async function handler(req, res) {
  const schema = joi.object().keys({
    input: joi.object().keys({
      from: joi.date().format("YYYY-MM-DD"),
      to: joi.date().format("YYYY-MM-DD"),
      limit: joi.number().default(10),
    }),
  });

  const vr = schema.validate(req.body, { allowUnknown: true });
  if (vr.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: vr.error.message });
  }

  // GET drivers
  const {
    data: driversResponse,
    errors: driversErrros,
  } = await fetchGraphQL(GetDriversQuery, vr.value.input);

  if (driversErrros) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: driversErrros[0].message });
  }

  const { drivers } = driversResponse;
  const ids = _.map(drivers, "id");

  // GET results
  const {
    data: resultsResponse,
    errors: resultsErrors,
  } = await fetchGraphQL(GetResultsQuery, { ids });

  if (resultsErrors) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: resultsErrors[0].message });
  }

  const { results } = resultsResponse;
  drivers.forEach(driver => {
    driver.result = _.chain(results)
      .filter({ driver_id: driver.id })
      .map(result => {
        return {
          race: result.race,
          milliseconds: result.milliseconds,
          fastest_lap_speed: result.fastest_lap_speed,
        };
      })
      .value();
  });
  return res.status(StatusCodes.OK).json(drivers);
}
