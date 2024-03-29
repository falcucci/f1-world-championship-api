<h1 align="center">F1 World Championship Service</h1>

<p align="center">A project to analyze drivers winners.</p> 


___
[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/5ae5b5688e9cbee57e46)

## Application Architectural Overview
____

<img width="1209" alt="Screenshot 2022-11-10 at 19 38 28" src="https://user-images.githubusercontent.com/33763843/201179042-cc6de8f8-609c-4ea3-a632-ba010f6ccccd.png">

Running the service requires some dependencies.

1. Docker and Docker Compose installed. [Install instructions.](https://docs.docker.com/get-docker/)
3. Hasura CLI installed. [Instructions here.](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html)


## Running the service
- Run `docker-compose up -d --build`
- Make sure all migrations are applied by running `npm run migrate`
- Make sure to fulfill the database using the seeds by running `npm run seeds`
- To start exploring, start hasura console with `hasura console`

if you wanna make sure the migrations has been applied to the correct schema, run:

```sh
docker exec f1-world-championship-api_app_1 sh -c npm run migrate"
```

and also the seeds to make sure

```sh
docker exec f1-world-championship-api_app_1 sh -c npm run seeds"
```

dont forget to track the schemas and create the actions

```sh
hasura metadata apply
```

In case you need to load env vars use the `.env` file as the sample

| name | description |
| ---- | ----------- |
| `HASURA_PROJECT_ENDPOINT`  | GraphQL engine endpoint |
| `NEXTJS_SERVER_URL`   | Next server |
| `ACTIONS_BASE_URL`  | Actions endpoint |

Or, run the development server by yourself to check better logs:
```bash
npm run dev
# or
yarn dev
```

Go to http://localhost:3000 to access the serveless functions

Go to http://localhost:8080 for Hasura console (admin secret = "")

Serveless functions are running at https://f1-world-championship-api.vercel.app/api/health

check it out the functions.
```bash
curl --location --request POST 'https://f1-world-championship-api.vercel.app/api/actions/drivers' \
--header 'x-hasura-admin-secret: X6M0Xj35Y1QqL6M66CBOj852xwEaUYqE6i2R246WQdZVQxptuO3sf7f6tv4ZObjb' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": {
        "from": "2021-12-16",
        "to": "2023-12-16",
        "limit": 10
    }
}'
```

Graphql engine is running at https://quiet-buzzard-46.hasura.app

try it out the actions:

```graphql
query {
    getDrivers(
      from: "2021-12-16",
      to: "2023-12-16",
      limit: 10
      ) {
    id
      forename
      surname
      standings_aggregate {
        aggregate {
          sum {
            wins
          }
        }
      }
    result {
      milliseconds
        fastest_lap_speed
        race {
          year
          name
          datetime
        }
    }
  } 
}
```
# Test Coverage

you can check if everything is fine running the assertions
```bash
npm run test
```
generate coverage
```bash
npm run coverage
```

here you have a simple test coverage report.

<img width="1171" alt="Screenshot 2022-11-11 at 04 24 32" src="https://user-images.githubusercontent.com/33763843/201256381-95a9c725-b1d8-4cfe-a018-36b978d0a3fb.png">

### The visual sample

As an example, the [bar chart below](https://falcucci.grafana.net/goto/VOqcJsDVz?orgId=1) shows 10 racers who have the most wins by time already consumed by our `GetDrivers` Hasura action.

<img width="1351" alt="Screenshot 2022-11-12 at 02 42 43" src="https://user-images.githubusercontent.com/33763843/201450728-83485990-dc9a-40ee-ba59-4d8389b54c06.png">

## DISCLAIMER

The high latency of the servers of the GraphQL engine and the vercel serveless functions is due the zone and cold start reasons. It should runs faster if we boost the server and change the regions. Also I made a tiny performance improvement to make sure it was the server latency instead of a low query issue at our engine. Try it out locally to see the difference.

## Deploy It Yourself 🎉

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/falcucci/f1-world-championship-api)


#### The Node Way&trade;

> "When applications are done well, they are just the really application-specific, brackish residue that can't be so easily abstracted away. All the nice, reusable components sublimate away onto github and npm where everybody can collaborate to advance the commons."

![node.js is shiny](https://feross.net/x/node2.gif)
