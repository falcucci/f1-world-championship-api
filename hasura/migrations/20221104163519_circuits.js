exports.up = function (knex) {
  return knex.schema.createTable("circuits", function (table) {
    table.increments("id").primary();
    table.string("circuit_ref", 255);
    table.string("name", 255);
    table.string("location", 255);
    table.string("country", 255);
    table.float("lat");
    table.float("lng");
    table.float("alt");
    table.string("url", 1000);

    table.comment("Table from circuits");
    table.index(
      ["id", "circuit_ref", "name", "location", "country"],
      "idx_circuits_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("circuits");
};
