import chalk from "chalk";
import { generateSpec } from "@tsoa/cli";
import { Tsoa } from "tsoa";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";

/**
 * Generates Open API/Swagger specification file
 */
export const generateOpenAPISpec = async (metadata?: Tsoa.Metadata) => {
  const timer = new Timer();
  await generateSpec(
    {
      basePath: "/api",
      entryFile: "./api/server.ts",
      outputDirectory: "./api/dist",
      noImplicitAdditionalProperties: "ignore",
    },
    undefined,
    undefined,
    metadata
  );

  log(chalk.greenBright(`✓ Generated OpenAPI spec (${timer.elapsed()}ms)`));
};
