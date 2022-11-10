const config = {
  hasura: {
    endpoint:
      process.env["HASURA_PROJECT_ENDPOINT"] ||
      "http://localhost:8080/v1/graphql",
    secret: process.env["HASURA_ADMIN_SECRET"] || "",
  },
};

module.exports = config;
