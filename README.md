# BSC-Project
Backend project for [this assignment](https://drive.google.com/file/d/1QJW6vOnB-vZfkB2cexK7YgNLFsdFCCdb/view?usp=share_link)

**Setting up the project**

1. To set the project up, an `.env` file has to be created in the root directory with these values: 

    * DB_USERNAME
    * DB_HOST
    * DB_DATABASE_NAME
    * DB_PASSWORD
    * DB_PORT
    * SERVER_PORT

2. Fill your details in `config.json`

3. Run migrations up with `npx sequelize-cli db:migrate`

4. Run server with `npm start` in root directory.