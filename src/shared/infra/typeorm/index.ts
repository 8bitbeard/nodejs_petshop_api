import { Connection, createConnection, getConnectionOptions } from "typeorm";

// export default async (): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();

//   return createConnection(
//     Object.assign(defaultOptions, {
//       database:
//         process.env.NODE_ENV === "test" ? "petshop_testing" : defaultOptions.database
//     })
//   )
// }

export default async (host = "database", port = 5432): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      port: process.env.NODE_ENV === "test" ? 5198 : port,
      database:
        process.env.NODE_ENV === "test"
          ? "petshop_testing"
          : defaultOptions.database,
    })
  );
};
