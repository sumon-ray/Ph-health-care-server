import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  RESET_PASSWORD_SECRET: process.env.RESET_PASSWORD_SECRET,
  RESET_PASSWORD_TOKEN_EXP_IN: process.env.RESET_PASSWORD_TOKEN_EXP_IN,
  RESET_PASSWORD_LINK: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
  },
};

