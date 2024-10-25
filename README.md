# Running the application

Both the frontend and backend applications have `Dockerfile`s to create docker images.
The easiest way to run is as follows:

```bash
$ docker-compose up
```

This will attempt to pull all images, fail on the apps, build them, and then start 5 containers:

- Postgres service
- Adminer
- Rails Backend
- Compiled React Frontend running on Nginx
- Setup Rails backend app
  - This is a pre-requisite for the Rails backend app which runs:
    - `rails db:create`
    - `rails db:migrate`
    - `rails db:seed`
  - The seeding script will create 100 partners and 100 customers using Faker to generate random data.

Both the Rails backend and Setup Rails backend depend on Postgres being healthy, so it might take a few seconds before the healthcheck is positive.

The Rails backend app will also only run after the Setup Rails backend app finishes successfully.

If everything is up and running, you should see the frontend when accessing http://localhost:5173/ on your browser.

Once you're done with it, to tear everything down, just stop docker compose, and then:

```bash
docker-compose stop && \
docker-compose rm -f && \
docker volume rm -f aroundhome_postgres-data && \
docker image rm -f aroundhome-{api,frontend}:tech-challenge
```
