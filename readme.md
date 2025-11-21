To start the project, use the following commands:

To install dependencies:
yarn

To create the database:
docker run -d --name pg-app \
  -e POSTGRES_DB=app -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=apppassword \
  -p 5432:5432 -v "$PWD":/work \
  postgres:15

To migrate the database:
docker exec -i pg-app psql -U appuser -d app -f /work/create.sql

To run server:
npx nodemon src/main.ts    

To run tests:
npx jest
