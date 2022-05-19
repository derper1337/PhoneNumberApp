# PhoneNumberApp

You have to download both client and server part to be able to work with this app.
## To start app on your local server:
First, go to server folder, execute following commands:
>npm install

>npm start

Then, go to client folder, execute the same commands:
>npm install

>npm start

After that, the backend and frontend part of the app must be ready. Visit http://localhost:3000 to see how it works.
# Usage
You can add more country / region codes in selector by changing the server/config.json file.

App running on ports 3000-3001, so make sure they are free to use.

## Note about MySQL database:
This app working based on remotesql.com service, which provide remote MySQL database. Work with the database on:
>https://remotemysql.com/phpmyadmin/index.php

*if you get the cookie error, try again. Also maybe some chrome extensions blocking it.
>Login: eOvCkCke3N

>Password: nAzWOm33yS

There is no need to initialise database on your machine(*). BUT you can do so, by importing one of the .sql files located on server/databaseDumps/ folder
(one for importing table, and one for importing whole database). Do not forget to change db_config variable in server/index.js to connect to your database.

(*)Actualy, there is some issues with remotesql.com - it automaticly drops the connection after some time, that's why i add handleDisconect function.

#### Technologies used: 
- HTML JS CSS
- React
- Rdux
- MySQL
- Ant Design

Feel free to comment and point my misstakes.
