import pkg from 'pg';
const { Pool } = pkg;

const connectToDb = async () => {
        try{const pool = new Pool({
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
    });
    await pool.connect()}
    catch(error){
        console.log(error)
    }
}
export default connectToDb