# How to run

## Development environment

### Client

1. `cd` into the client folder
2. Do `npm i` to install dependencies
3. Run `npm run dev` to start development server

### Server

#### Database

Make sure MySQL is installed. You may refer to [this documentation](https://dev.mysql.com/doc/refman/8.0/en/installing.html) on how to install MySQL locally. The MySQL version used to develop this app is 8.0.36

Create the article database using the following command
```
mysql -u <USER> -p -e 'CREATE DATABASE IF NOT EXISTS article;'
```

I used [golang-migrate](https://github.com/golang-migrate/migrate) as the migration tool. You may follow [this documentation](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate) on how to install it.

After installation, run the migration file(s) using the following command
```
migrate -path ./server/database/migrations -database "mysql://<USER>:<PASSWORD>@tcp(<host>:<port>)/article" -verbose up
```

However, if you prefer to run the sql query manually, you may use the `./server/database/migrations/000001_init_mg.up.sql` file.

#### Server

I used [Air](https://github.com/cosmtrek/air) for hot reloading during development. If it is not yet installed locally, you may do the following command to install it
```
go install github.com/cosmtrek/air@latest
```

Make sure `.env` file exists. You may follow the format in `.env.example`

Simply run the following command to run a development server
```
air
```

## Production Environment

Make sure [docker and docker-compose is installed](https://docs.docker.com/compose/install/) and do `docker-compose up --build`

That should create MySQL, server, and client containers.