import { CommandModule } from "yargs";
import { stopDocker } from "../../../../node/src/dev/stop-docker";

const stop: CommandModule<{}> = {
  command: "stop",
  describe: "Stop docker services",
  handler: async () => {
    await stopDocker();
  },
};

export default stop;
