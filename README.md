# MiniSosmed

### integrasi backend

- open folder backend
`cd backend`
- install composer
`composer install`
- create new file with name `.env`
- copy all code from file `.env.example` then paste in file `.env`
- generate key in env
`php artisan key:generate`
- create key jwt 
`php artisan jwt secret`
- dont forget to start localhost with laragon
- create new database mysql with name `minisosmed`
- create table database 
`php artisan migrate`
- seeding data
`php artisan db:seed`

### integrasi frontend
- open folder frontend
`cd frontend`
- install package frontend
`npm install`

### Start Website
- with 2 terminal, in terminal 1 type : `cd backend` then type `php artisan serve`
- in terminal 2 type: `cd frontend` then type `npm start`
- in browser type `localhost:3000`
- then login with email or phone number in database with table `users`
- login with password `user123`

