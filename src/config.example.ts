import type { Options as DatabaseOptions } from "sequelize";

// Primary config
export const token = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
export const MidtransAPIKey = "XXXXXXXXXXXXXXXXXXXXXXXX";
export const TransactionPrefix = "XXX";
export const OWNERS_ID = [123456];
export const encKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// SMTP Config
export const smtpHost = "smtp.example.com";
export const smtpPort = 465;
export const smtpTls = true;
export const smtpEmail = "email@example.com";
export const smtpPassword = "examplepass123";

// Database Config
export const databaseConfig: DatabaseOptions = {
    host: 'XXXXXXXXXXXXx',
    port: 6039,
    protocol: 'TCP',
    password: 'XXXXXXXXXXXXXXXXX',
    username: 'XXXXXXXXXXXXXXXXXxx',
    dialect: 'mysql',
    database: 'XXXXXXXXXXXXxx',
};
