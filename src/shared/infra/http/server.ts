import { app } from "./app";

app.listen(process.env.HOST_PORT, () =>
  console.log(`Server is running on port: ${process.env.HOST_PORT}`)
);
