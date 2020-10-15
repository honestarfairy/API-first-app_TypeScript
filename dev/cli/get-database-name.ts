import readlineSync from "readline-sync";
import chalk from "chalk";
import { DbConnectionName } from "../../node/database/db-connection-name";

export const getDatabaseName = (): DbConnectionName => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require("../../ormconfig.js");

  return readlineSync.question(
    chalk.blue(
      `Select a database (${config
        .map((value: { name: string }) => value.name)
        .join(" | ")}):\n`
    )
  ) as DbConnectionName;
};
