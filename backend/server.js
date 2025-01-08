import app from "./app.js";
import detect from "detect-port";

const defaultPort = process.env.PORT;

detect(defaultPort).then((port) => {
  if (port === parseInt(defaultPort, 10)) {
    app.listen(port, () => {
      console.log(`SERVER HAS STARTED ON http://localhost:${port}`);
    });
  } else {
    console.log(`Port ${defaultPort} is in use. Switching to port ${port}.`);

    app.listen(port, () => {
      console.log(`SERVER HAS STARTED ON http://localhost:${port}`);
    });
  }
});
