# Just Lift
## A digital training logger
### Deployed at https://justlift.christianblom.se
To get started:
In the project root:
```
cp .env.example .env
cp client/deploy/.env.dist client/deploy/.env
cp server/deploy/.env.dist server/deploy/.env

or:

cp .env.example .env && cp client/deploy/.env.dist client/deploy/.env && cp server/deploy/.env.dist server/deploy/.env

then:

docker-compose up -d
```

The Docker-compose file is set up to install npm packages inside the containers and then copy them to the project folder.
This is in order to avoid OS-conflicts with paths, line endings and node-sass context.

If you need to add a new package, either exec into the corresponding container and npm install it there, or add the package
to your package.json and run docker-compose up -d --build.
