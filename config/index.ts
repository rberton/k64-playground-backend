import dotenv from "dotenv";
dotenv.config();
export default {
  db: process.env.DB,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://k64playground.net/",
    "https://www.k64playground.net",
    "http://localhost:10000",
    "http://localhost:10001",
    "http://localhost:10002",
    "https://studio.apollographql.com",
    "https://k64playground.local",
  ],
};
