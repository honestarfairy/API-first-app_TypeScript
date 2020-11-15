import path from "path";
import rimraf from "rimraf";
import { Tsoa } from "tsoa";
import { generate } from "openapi-typescript-codegen";
import { log } from "../../node/utils/log";
import { Timer } from "../../node/utils/timer";
import { generateOpenAPISpec } from "./generate-openapi-spec";

/**
 * Generates the OpenAPI client library
 */
export const generateOpenAPIClient = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPISpec(metadata);

  const timer = new Timer();

  rimraf.sync(path.join(__dirname, "../../openapi-client/out"));

  generate({
    input: "./.tmp/swagger.json",
    output: "./src/openapi-client/out",
    useOptions: true,
  });

  log.success(`Generated Client (${timer.elapsed()}ms)`);
};
