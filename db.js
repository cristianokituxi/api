// import database from "pg"
// import * as dotenv from "dotenv" 

// const environment = process.env.NODE_ENV || 'development';

// dotenv.config({ path: `.env.${environment}` });

// export const db = new database.Client({
//   host: process.env.DB_HOST,
//   port: process.env.PORT ,
//   user:  process.env.DB_USER,
//   password:  process.env.DB_PASSWORD,
//   database: process.env.DATABASE
// })
// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
import database from "pg"
import * as dotenv from "dotenv" 

const environment = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${environment}` });



export const db = new database.Client({
    connectionString:"postgres://default:ibyAe9l2KSdn@ep-cold-sound-a46pxxj0-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  })
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
