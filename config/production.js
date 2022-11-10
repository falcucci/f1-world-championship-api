const config = {
  hasura: {
    endpoint:
      process.env["HASURA_PROJECT_ENDPOINT"] ||
      "https://quiet-buzzard-46.hasura.app/v1/graphql",
    secret: process.env["HASURA_ADMIN_SECRET"] || "",
  },
};

module.exports = config;
