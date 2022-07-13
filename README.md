# Node API Challenge

# Prerequisites

Here's a list of what tools you'll need to start the project:

-  Node js (download [here](https://nodejs.org/en/download/))

- Docker (we recommend to use docker desktop, download it from [here](https://docs.docker.com/desktop/#download-and-install))

- (Recommended) Visual Studio Code to use the `Remote - Containers` extension.

Each Environment has their own `DockerFile` and `docker-compose files`. You do not need to modify them to launch the project but you are still free do to do.

## Dev Environment

The environment variables are located in db/.env.dev

### Start using Remote Containers

Use the `.devcontainer` folder to start you project with the `Remote - Containers` extension from VSC.

Then once inside use:

`npm run dev`

OR 

`yarn dev`

To start the project

### Start manually 

Execute: 

`docker-compose -f docker-compose.dev.yml up`

Then once inside use:

`npm run dev`

OR 

`yarn dev`

To start the project


## Stage Environment (Prod)

The environment variables are located in db/.env.stage

Execute:

`docker-compose -f docker-compose.stage.yml up`

### Update your image if you modify your source code

If you modify your source code, you can redeploy the API by following these commands :

```sh
# Recompile the stage-api service image 
docker-compose -f docker-compose.stage.yml build stage-api
# Enabling the image
docker-compose -f docker-compose.stage.yml pull stage-api
# Start the container based on the image
docker-compose -f docker-compose.stage.yml up -d stage-api
```

