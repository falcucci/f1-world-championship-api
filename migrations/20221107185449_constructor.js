exports.up = function (knex) {
  return knex.schema.createTable("constructors", function (table) {
    table.increments("id").primary();
    table.string("constructor_ref", 255);
    table.string("name", 255);
    table.string("nationality", 255);
    table.string("url", 1000);

    table.comment("Table from constructors");
    table.index(
      ["id", "constructor_ref", "name", "nationality"],
      "idx_constructors_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("constructors");
};
