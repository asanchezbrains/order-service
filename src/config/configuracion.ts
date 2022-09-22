export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    mongo: process.env.URL_MONGO_HOST,
    port: parseInt(process.env.BD_PORT, 10) || 3306,
    host: process.env.BD_HOST,
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
  },
});