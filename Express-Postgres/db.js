const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL,{
    ssl:'require'
});

// sql`drop table tasks`.then(()=>{console.log('Table deleted')}).catch((error)=>{console.log(error)});


module.exports = sql; // Export the sql object for use in other files