const config = require("config");
const joi = require("joi").extend(require("@joi/date"));

const { StatusCodes } = require("http-status-codes");
const {
  fetchGraphQL,
} = require("../../../../hasura/utils/functions");
const {
  GetDriversQuery,
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
  const { data, errors } = await fetchGraphQL(
    GetDriversQuery,
    vr.value.input
  );

  if (errors) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors[0].message });
  }
  return res.status(StatusCodes.OK).json(data.drivers);
}
