import config from "./config/env";
import { initDB } from "./db";
import app from "./app";

const main = () => {
  initDB();

  // Listen on the specified port
  app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`);
  });
};

main();
