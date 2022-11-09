const fetch = require("node-fetch");
const joi = require("joi").extend(require("@joi/date"));

const { GetDriversQuery } = require('../utils/queries')
const { StatusCodes } = require("http-status-codes");

/**
 * Dispatch a req, res into the serveless function.
 * @async
 */
export default async function handler(req, res) {
  const { from, to, limit } = req.query;
  const variables = {
    from,
    to,
    limit,
  };

  const schema = joi.object().keys({
    from: joi.date().format("YYYY-MM-DD"),
    to: joi.date().format("YYYY-MM-DD"),
    limit: joi.number().default(10),
  });
  const vr = schema.validate(variables);
  if (vr.error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: vr.error.message });
  }
  const { data, errors } = await fetchGraphQL(
    GetDriversQuery,
    vr.value
  );

  if (errors) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors[0].message });
  }
  return res.status(StatusCodes.OK).json(data.drivers);
}

/**
 * Generic Method that aims to fetch the graphql
 *
 * @async
 * @param {Object} query
 * @param {Object} variables
 */
async function fetchGraphQL(query, variables) {
  const response = await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({ query, variables }),
    }
  );
  return await response.json();
}
