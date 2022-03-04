import dotenv from "dotenv";
import path from "path";

const globalSetup = () => {
  dotenv.config({ path: path.join(__dirname, ".env.test") });
};

export default globalSetup;
