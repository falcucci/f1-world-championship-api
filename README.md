<h1 align="center">
  <b>F1 World Championship Service</b><br>
</h1>

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
#### The Node Way&trade;

> "When applications are done well, they are just the really application-specific, brackish residue that can't be so easily abstracted away. All the nice, reusable components sublimate away onto github and npm where everybody can collaborate to advance the commons."

![node.js is shiny](https://feross.net/x/node2.gif)
