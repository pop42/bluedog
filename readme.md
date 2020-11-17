# Bluedog

A first attempt at building out a fully-fledged event-sourced, CQRS system.


--------------------------

### Developers

This assumes you have cloned the repo AND you have docker running on your machine.

From root of the project, type `npm i` to be sure you have the basics and can do local development.

Then type `npm run start` to start the entire process.

API server runs at http://localhost:4200
adminer server runs at http://localhost:8080

#### log into adminer (if you need it instead of datagrip or some other pg client)
````
server:     viewDb
user:       postgres
password:   Xerifleet2
database:   view_db
````

#### add companies via api

POST /api/companies/addCompany

see your results in both message_db and view_db.



