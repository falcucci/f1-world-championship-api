"use strict";

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Deletes ALL existing entries
    knex("drivers").del(),
    knex("circuits").del(),
    knex("races").del(),
    knex("driver_standings").del(),
  ]);
};
