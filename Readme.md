# POC MongoDB - CosmoDB with Mongo API
Compatibility tests when switching from MongoDB to CosmoDB with Mongo API

## Why MongoDB 3.6?
We are using MongoDB 3.6 beacuse its one of the version where LTS expiry is still to be defined: https://www.mongodb.com/support-policy

- MongoDB 3.4 has LTS till 1 Jan 2020. 
- MongoDB 3.2 LTS expired on 2019. 

## Getting Started
`git clone RepoName`

## Prerequisites
- Docker 
- Docker Compose (Included in Docker Desktop)

## Installing

#### Azure CosmoDB

First you need to create a CosmoDB instance in Azure.

If you are not logged in Azure use `az login` from the cli.

Be sure to set the right subscription using `az account set --subscription xxxxxxxxx`.

Now you can change the parameter and run the script `set-cosmosdb.sh` that sits on the `scripts` folder.

This will create cosmodb instance and output the neccessary information that you will need to follow along.

Note: Aggregation pipelines by default are disabled. The `set-cosmosdb.sh` enables them but if you create the CosmoDB manually go to the CosmoDB account under `Preview Features` and enable Aggregation Pipeline.

#### Azure CosmoDB Emulator for local development

Download and install CosmoDB emulator from https://aka.ms/cosmosdb-emulator.

If you want to use docker for running the cosmodb emulator you will need to enable windows containers, currently it dosent run on Linux Containers.

For our use case we will install the emulator on the host machine.

By default CosmoDB emulator starts only the SQL endpoint enabled so you need to enable the MongoDB endpoint manually.

- https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator-release-notes#release-notes

To enable MongoDB endpoint start the emulator from CMD with Administrative rights using the option `/EnableMongoDbEndpoint`

E.g. `C:\Programs\Azure Cosmos DB Emulator /EnableMongoDbEndpoint`.

#### Build docker image

From the root folder build the Docker Image
`docker build . -t poc:latest`

#### Start it with docker-compose

Docker compose will spin up three containers for our application + the mongo db instance.

Each of our app containers  will need their .env files namely:

- `app.cosmos.env` used to hold the credentials of the cosmos db instance in azure
- `app.localcosmos.env` used to hold the credentials of the local cosmos db instnace
- `app.mongo.env` used to hold the credentials of the local mongodb instance
- `mongo.env` contains the init username and password configuration, template is `mongo.env.template`

After creating and filling the env files from the root folder you can start everything using
`docker-compose up`

## Known issues

#### Container to host accessing services

When installing the azure cosmos emulator in the host machine the url to access the locahost from the container is `host.docker.internal` which points to the ip address of the host machine.

One alternative is to run the container which accesses the emulator using `network_mode=host` but be aware that Docker Desktop for Mac and Windows dosent support it. It works only on Linux.

That means in the `app.localcosmos.env` file the `DB_CONNSTR` contains the value `mongodb://host.docker.internal:10255/dbName?ssl=true` to reference the host machine.

#### Volume mapping for development mode

If you mount the `./src` folder into the container so that while the container is running you can change the code be sure that from your host machine you didnt install nodes_modules first. Some of the modules when installed for Windows will download command scripts that wont work in Linux. 

If you install the node_modules from the container then it will work when you change the code locally (but not when run also locally).

## Testing
If you want to test each of the connections you can log into the respective containers using 
`docker exec -it xxxcontainer_idxxx "/bin/bash"`

The application has been configured with script commands which can be run using `npm run command_name` 
- `test` runs all the tests once (Default)
- `twatch` runs the tests on watch mode, helpful when mounting the `.\src` folder and connection to the container interactivly.
- `test:debug` opens the possibility to debug the tests remotly using `chrome://inspect` (dont forget to port map in the docker-compose.yaml)
- `start` which starts nodemon index.js. Use it to keep the container alive (e.g. to connect to the container). You can override it in docker-compose file.
The tests are written to test basic CRUD operations, Aggregations and more complex Queuries.