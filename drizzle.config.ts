import { type Config } from "drizzle-kit";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // .env 파일을 직접 읽어서 process.env에 주입

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["drive_tutorial_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST!,
    port: parseInt(process.env.SINGLESTORE_PORT!),
    user: process.env.SINGLESTORE_USER!,
    password: process.env.SINGLESTORE_PASS!,
    database: process.env.SINGLESTORE_DB_NAME!,
    ssl: {},
  },
} as Config;
