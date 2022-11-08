exports.up = function (knex) {
  return knex.schema.createTable("statuses", function (table) {
    table.increments("id").primary();
    table.string("status", 255);

    table.comment("Table from statuses");
    table.index(
      ["id", "status"],
      "idx_statuses_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("statuses");
};
