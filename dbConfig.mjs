import { Pool } from 'pg';

const Pool = new Pool ({
    user: "username",
    host: "localhost",
    database: "database_name",
    password: "password",
    port: 5432,

});

export default pool