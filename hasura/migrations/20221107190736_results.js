exports.up = function (knex) {
  return knex.schema.createTable("results", function (table) {
    table.increments("id").primary();
    table.integer("number");
    table.integer("grid");
    table.integer("position");
    table.string("position_text", 255);
    table.integer("position_order");
    table.float("points");
    table.integer("laps");
    table.float("milliseconds");
    table.integer("fastest_lap");
    table.integer("rank");
    table.string("fastest_lap_time", 20);
    table.float("fastest_lap_speed");

    table.integer("race_id").unsigned();
    table.foreign("race_id").references("id").inTable("races");

    table.integer("driver_id").unsigned();
    table.foreign("driver_id").references("id").inTable("drivers");

    table.integer("constructor_id").unsigned();
    table
      .foreign("constructor_id")
      .references("id")
      .inTable("constructors");

    table.integer("status_id").unsigned();
    table
      .foreign("status_id")
      .references("id")
      .inTable("statuses");

    table.comment("Table from results");
    table.index(
      [
        "id",
        "points",
        "milliseconds",
        "fastest_lap",
        "fastest_lap_time",
        "fastest_lap_speed",
      ],
      "idx_results_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("results");
};
