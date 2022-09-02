import { Sequelize } from "sequelize";
import { databaseConfig } from "../config";

export default new Sequelize(databaseConfig || {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "midtrans-bot",
    dialect: "mysql"
});