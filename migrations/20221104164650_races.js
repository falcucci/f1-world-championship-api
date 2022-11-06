exports.up = function (knex) {
  return knex.schema.createTable("races", function (table) {
    table.increments("id").primary();
    table.integer("year");
    table.integer("round");
    table.string("name", 255);
    table.string("url", 1000);
    table.datetime("datetime");
    table.datetime("fp1_datetime");
    table.datetime("fp2_datetime");
    table.datetime("fp3_datetime");
    table.datetime("sprint_datetime");
    table.datetime("qualification_datetime");

    table.integer("circuit_id").unsigned();
    table
      .foreign("circuit_id")
      .references("id")
      .inTable("circuits");

    table.comment("Table from driver_standings");
    table.index(
      [
        "id",
        "year",
        "round",
        "name",
        "url",
        "datetime",
        "fp1_datetime",
        "fp2_datetime",
        "fp3_datetime",
        "sprint_datetime",
        "qualification_datetime",
      ],
      "idx_races_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("races");
};
