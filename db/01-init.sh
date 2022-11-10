#!/bin/bash
set -e
export PGPASSWORD='localhost';
psql -v ON_ERROR_STOP=1 --username "races" --dbname "races_db" <<-EOSQL
  CREATE USER races WITH PASSWORD 'localhost';
  CREATE DATABASE races_db;
  GRANT ALL PRIVILEGES ON DATABASE races_db TO races;
  \connect races_db races
EOSQL
