import { parseBoolean } from "../libs/parseBoolean";

export const configFactory = () => {
  return {
    database: {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: parseBoolean(process.env.DATABASE_SYNCHRONIZE),
    },
  };
};
