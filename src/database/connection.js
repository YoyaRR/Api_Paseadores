import * as mysql from 'mysql'

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'patitapp'
})

pool.getConnection((err, con) => {
    if (err) 
        console.warn(`Databased failed to start with error: ${err}`);
    if(con.state === 'disconnected')
        console.log(`Database connection failed. Check that its running and that your configuration is correct`);
    else 
        console.log('Database connection successful');
});