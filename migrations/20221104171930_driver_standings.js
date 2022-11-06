exports.up = function (knex) {
  return knex.schema.createTable("driver_standings", function (table) {
    table.increments("id").primary();
    table.float("points");
    table.integer("position");
    table.integer("position_text");
    table.integer("wins");

    table.integer("driver_id").unsigned();
    table.foreign("driver_id").references("id").inTable("drivers");

    table.integer("race_id").unsigned();
    table.foreign("race_id").references("id").inTable("races");

    table.comment("Table from driver_standings");
    table.index(
      ["id", "points", "position", "wins"],
      "idx_driver_standings_1"
    );
    table.engine("InnoDB");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("driver_standings");
};
