const fetch = require("node-fetch");

/**
 * Generic Method that aims to fetch the graphql
 *
 * @async
 * @param {Object} query
 * @param {Object} variables
 */
async function fetchGraphQL(query, variables) {
  const response = await fetch(process.env["HASURA_PROJECT_ENDPOINT"], {
    headers: {
      "x-hasura-admin-secret": process.env["HASURA_ADMIN_SECRET"]
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });
  return await response.json();
}

module.exports = {
  fetchGraphQL
}
