exports.up = function (knex) {
  return knex.schema.createTable("drivers", function (table) {
    table.increments("id").primary();
    table.string("driver_ref", 255);
    table.integer("number");
    table.string("code", 255);
    table.string("forename", 255);
    table.string("surname", 255);
    table.datetime("dob");
    table.string("nationality", 255);
    table.string("url", 1000);

    table.comment("Table from drivers");
    table.index(
      ["id", "driver_ref", "code", "forename", "surname"],
      "idx_drivers_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("drivers");
};
